import { useEffect, useRef } from "react";
import type { GlobeInstance } from "globe.gl";

type City = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  nx: number;
  ny: number;
  origin: boolean;
};

const CITIES: City[] = [
  { id: "lax", name: "Los Angeles", lat: 34.05, lng: -118.24, nx: 0, ny: -14, origin: true },
  { id: "dub", name: "Dublin", lat: 53.35, lng: -6.26, nx: -8, ny: -14, origin: true },
  { id: "man", name: "Manchester", lat: 53.48, lng: -2.24, nx: 10, ny: -14, origin: true },
  { id: "lon", name: "London", lat: 51.51, lng: -0.13, nx: -10, ny: 13, origin: true },
  { id: "ber", name: "Berlin", lat: 52.52, lng: 13.41, nx: 12, ny: 12, origin: true },
  { id: "bcn", name: "Barcelona", lat: 41.39, lng: 2.17, nx: 0, ny: 14, origin: true },
  { id: "samui", name: "Koh Samui", lat: 9.51, lng: 100.01, nx: 8, ny: -14, origin: false },
  { id: "hkt", name: "Phuket", lat: 7.88, lng: 98.39, nx: -8, ny: 13, origin: false },
];

const DESTINATIONS = CITIES.filter((city) => !city.origin);

const ARCS = CITIES.filter((city) => city.origin).flatMap((origin, index) =>
  DESTINATIONS.map((dest, destIndex) => ({
    startLat: origin.lat,
    startLng: origin.lng,
    endLat: dest.lat,
    endLng: dest.lng,
    altitude: 0.16 + ((index + destIndex * 2) % 5) * 0.045,
    time: 2600 + ((index * 3 + destIndex) % 7) * 320,
    gap: (index * 0.19 + destIndex * 0.13) % 1,
  })),
);

type Pin = { city: City; el: HTMLElement };

function token(name: string, fallback: string) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
}

function withAlpha(hex: string, alpha: number) {
  const h = hex.replace("#", "");
  if (h.length !== 6) return hex;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function GlobeHero() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let globe: GlobeInstance | null = null;
    let raf = 0;
    let cancelled = false;
    let lng = 48;
    const pins: Pin[] = [];

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    const onPointerDown = () => {
      if (globe) globe.controls().autoRotate = false;
    };

    let cleanup = () => {
      cancelled = true;
    };

    const resize = () => {
      if (!globe || !host) return;
      const renderer = globe.renderer();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, fine ? 1.6 : 1.25));
      globe.width(host.clientWidth).height(host.clientHeight);
    };

    const separate = () => {
      if (!globe || host.clientWidth === 0) return;
      const placed: {
        pin: Pin;
        x: number;
        y: number;
        ax: number;
        ay: number;
        hw: number;
        hh: number;
      }[] = [];

      for (const pin of pins) {
        if (pin.el.dataset.back === "1") continue;
        const point = globe.getScreenCoords(pin.city.lat, pin.city.lng, 0.01);
        if (!point || !Number.isFinite(point.x) || !Number.isFinite(point.y)) continue;
        const name = pin.el.querySelector(".globe-pin-name");
        const lw = name instanceof HTMLElement ? name.offsetWidth : 80;
        const lh = name instanceof HTMLElement ? name.offsetHeight : 12;
        placed.push({
          pin,
          ax: point.x,
          ay: point.y,
          x: point.x + pin.city.nx,
          y: point.y + pin.city.ny,
          hw: lw / 2 + 2,
          hh: lh / 2 + 2,
        });
      }

      for (let iter = 0; iter < 16; iter += 1) {
        for (let i = 0; i < placed.length; i += 1) {
          const a = placed[i];
          for (let j = i + 1; j < placed.length; j += 1) {
            const b = placed[j];
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const overlapX = a.hw + b.hw - Math.abs(dx);
            const overlapY = a.hh + b.hh - Math.abs(dy);
            if (overlapX > 0 && overlapY > 0) {
              if (overlapX < overlapY) {
                const push = overlapX / 2 + 1;
                const sign = dx === 0 ? 1 : Math.sign(dx);
                a.x -= sign * push;
                b.x += sign * push;
              } else {
                const push = overlapY / 2 + 1;
                const sign = dy === 0 ? 1 : Math.sign(dy);
                a.y -= sign * push;
                b.y += sign * push;
              }
            }
          }

          const ox = a.x - a.ax;
          const oy = a.y - a.ay;
          const dist = Math.hypot(ox, oy);
          const max = 22;
          if (dist > max) {
            a.x = a.ax + (ox / dist) * max;
            a.y = a.ay + (oy / dist) * max;
          }
        }
      }

      for (const item of placed) {
        item.pin.el.style.setProperty("--nx", `${Math.round(item.x - item.ax)}px`);
        item.pin.el.style.setProperty("--ny", `${Math.round(item.y - item.ay)}px`);
      }
    };

    const loop = () => {
      if (globe && !fine && !reduce) {
        lng += 0.175;
        globe.pointOfView({ lat: 22, lng, altitude: 2.08 }, 0);
      }
      separate();
      raf = requestAnimationFrame(loop);
    };

    const onHide = () => {
      if (!globe) return;
      if (document.hidden) globe.pauseAnimation();
      else globe.resumeAnimation();
    };

    (async () => {
      const { default: Globe } = await import("globe.gl");
      if (cancelled || !host) return;

      const fg = token("--color-fg", "#f6f3ec");
      const accent = token("--color-accent", "#d10505");
      const bg = token("--color-bg", "#070908");

      globe = new Globe(host, {
        rendererConfig: {
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        },
      });

      globe
        .backgroundColor(bg)
        .backgroundImageUrl("/globe/night-sky.png")
        .globeImageUrl("/globe/earth-night.jpg")
        .bumpImageUrl("/globe/earth-topology.png")
        .showAtmosphere(true)
        .atmosphereColor("#9ec4ff")
        .atmosphereAltitude(0.18)
        .arcsData(ARCS)
        .arcStartLat("startLat")
        .arcStartLng("startLng")
        .arcEndLat("endLat")
        .arcEndLng("endLng")
        .arcColor(() => [withAlpha(fg, 0.28), accent])
        .arcAltitude("altitude")
        .arcStroke(0.38)
        .arcDashLength(reduce ? 1 : 0.36)
        .arcDashGap(reduce ? 0 : 0.95)
        .arcDashInitialGap("gap")
        .arcDashAnimateTime(reduce ? 1000000 : "time")
        .pointsData(CITIES)
        .pointLat("lat")
        .pointLng("lng")
        .pointColor((city) => ((city as City).origin ? fg : accent))
        .pointAltitude(0.012)
        .pointRadius(0.32)
        .pointResolution(6)
        .htmlElementsData(CITIES)
        .htmlLat("lat")
        .htmlLng("lng")
        .htmlAltitude(0.012)
        .htmlTransitionDuration(0)
        .htmlElement((datum) => {
          const city = datum as City;
          const el = document.createElement("div");
          el.className = "globe-pin";
          el.style.setProperty("--nx", `${city.nx}px`);
          el.style.setProperty("--ny", `${city.ny}px`);
          const label = document.createElement("span");
          label.className = "globe-pin-name";
          label.textContent = city.name;
          el.append(label);
          pins.push({ city, el });
          return el;
        })
        .htmlElementVisibilityModifier((el, isVisible) => {
          el.dataset.back = isVisible ? "0" : "1";
          el.style.visibility = isVisible ? "visible" : "hidden";
        })
        .pointOfView({ lat: 22, lng: 48, altitude: 2.08 }, 0);

      const controls = globe.controls();
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;
      controls.minPolarAngle = 0.45;
      controls.maxPolarAngle = Math.PI - 0.45;
      controls.autoRotate = fine && !reduce;
      controls.autoRotateSpeed = 1.6;
      if (!fine) {
        controls.enabled = false;
        globe.enablePointerInteraction(false);
        host.style.pointerEvents = "none";
      }

      resize();
      const observer = new ResizeObserver(resize);
      observer.observe(host);
      host.addEventListener("pointerdown", onPointerDown);
      document.addEventListener("visibilitychange", onHide);
      raf = requestAnimationFrame(loop);

      const stop = () => {
        cancelled = true;
        cancelAnimationFrame(raf);
        observer.disconnect();
        host.removeEventListener("pointerdown", onPointerDown);
        document.removeEventListener("visibilitychange", onHide);
        globe?._destructor();
        globe = null;
      };

      if (cancelled) stop();
      else cleanup = stop;
    })();

    return () => cleanup();
  }, []);

  return <div ref={hostRef} className="absolute inset-0" aria-hidden="true" />;
}
