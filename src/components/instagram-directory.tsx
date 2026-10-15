import { useEffect, useRef, type PointerEvent, type RefObject } from "react";
import { Instagram } from "lucide-react";

type Profile = { handle: string };

const CONTACTS: Profile[] = [
  { handle: "johndoeshyne" },
  { handle: "johndoesupplyco.xo" },
  { handle: "dannymowlds" },
  { handle: "thecalicaverecords" },
  { handle: "johndoesupply.ldn" },
];

const SHOPS: Profile[] = [{ handle: "johndoekohsamui" }, { handle: "johndoephuket" }];

function instagramUrl(handle: string) {
  return `https://www.instagram.com/${handle}/`;
}

function tilt(event: PointerEvent<HTMLAnchorElement>) {
  const rect = event.currentTarget.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;
  event.currentTarget.style.setProperty("--rx", `${(-y * 7).toFixed(2)}deg`);
  event.currentTarget.style.setProperty("--ry", `${(x * 9).toFixed(2)}deg`);
}

function resetTilt(event: PointerEvent<HTMLAnchorElement>) {
  event.currentTarget.style.setProperty("--rx", "0deg");
  event.currentTarget.style.setProperty("--ry", "0deg");
}

function ProfileLink({ handle }: Profile) {
  return (
    <a
      className="ig-card"
      href={instagramUrl(handle)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Instagram @${handle}`}
      onPointerMove={tilt}
      onPointerLeave={resetTilt}
    >
      <span className="ig-mark">
        <Instagram aria-hidden="true" strokeWidth={1.5} />
        <span className="ig-coal" data-ember="" />
      </span>
      <span className="ig-handle">@{handle}</span>
    </a>
  );
}

function useBluntSmoke(rootRef: RefObject<HTMLElement | null>, canvasRef: RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const styles = getComputedStyle(document.documentElement);
    const fg = styles.getPropertyValue("--color-fg").trim() || "#f6f3ec";
    const accent = styles.getPropertyValue("--color-accent").trim() || "#d10505";

    const sprite = document.createElement("canvas");
    sprite.width = 64;
    sprite.height = 64;
    const scratch = sprite.getContext("2d");
    if (!scratch) return;
    const puff = scratch.createRadialGradient(32, 32, 0, 32, 32, 32);
    puff.addColorStop(0, hexAlpha(fg, 0.7));
    puff.addColorStop(0.45, hexAlpha(fg, 0.18));
    puff.addColorStop(1, hexAlpha(fg, 0));
    scratch.fillStyle = puff;
    scratch.fillRect(0, 0, 64, 64);

    type Particle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      size: number;
      seed: number;
      hot: number;
    };
    const particles: Particle[] = [];
    let frame = 0;
    let windX = 0;
    let windY = 0;
    let lastX = 0;
    let lastY = 0;
    let seenPointer = false;

    const resize = () => {
      const rect = root.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(root);

    const onMove = (event: globalThis.PointerEvent) => {
      const rect = root.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (seenPointer) {
        windX += (x - lastX) * 0.06;
        windY += (y - lastY) * 0.03;
      }
      lastX = x;
      lastY = y;
      seenPointer = true;
    };
    root.addEventListener("pointermove", onMove);

    const draw = (time: number) => {
      const rect = root.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      windX *= 0.9;
      windY *= 0.9;

      const embers = root.querySelectorAll<HTMLElement>("[data-ember]");
      embers.forEach((ember, index) => {
        const box = ember.getBoundingClientRect();
        const link = ember.closest("a");
        const hot = Boolean(link && (link.matches(":hover") || link.matches(":focus-visible")));
        const cx = box.left - rect.left + box.width / 2;
        const cy = box.top - rect.top + box.height / 2;
        if (particles.length < 260 && Math.random() < (hot ? 0.92 : 0.28)) {
          const angle = Math.random() * Math.PI * 2;
          particles.push({
            x: cx + Math.cos(angle) * 1.5,
            y: cy + Math.sin(angle) * 1.5,
            vx: Math.cos(angle) * (hot ? 0.42 : 0.16),
            vy: -0.25 - Math.random() * (hot ? 0.85 : 0.4),
            life: 1,
            size: (hot ? 16 : 10) + Math.random() * 8,
            seed: index * 12 + Math.random() * 8,
            hot: hot ? 1 : 0,
          });
        }
        if (hot && particles.length < 260 && Math.random() < 0.35) {
          particles.push({
            x: cx,
            y: cy,
            vx: (Math.random() - 0.5) * 0.8,
            vy: -1.1 - Math.random() * 0.8,
            life: 0.45,
            size: 3 + Math.random() * 2,
            seed: 40 + index,
            hot: 2,
          });
        }

        const radius = hot ? 34 : 18;
        const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        glow.addColorStop(0, hexAlpha(fg, hot ? 0.95 : 0.75));
        glow.addColorStop(0.22, hexAlpha(accent, hot ? 0.9 : 0.55));
        glow.addColorStop(1, hexAlpha(accent, 0));
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      for (let i = particles.length - 1; i >= 0; i -= 1) {
        const particle = particles[i];
        const curl = Math.sin(time * 0.0025 + particle.seed) * 0.045;
        const ring = Math.cos(time * 0.0018 + particle.seed * 1.7) * 0.03;
        particle.vx += curl + windX * 0.025;
        particle.vy += -0.011 + ring + windY * 0.012;
        particle.vx *= 0.986;
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= particle.hot === 2 ? 0.03 : particle.hot ? 0.0075 : 0.01;
        particle.size += particle.hot === 2 ? 0.05 : 0.22;
        if (particle.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        const fade = Math.sin(Math.min(1, particle.life) * Math.PI);
        if (particle.hot === 2) {
          ctx.globalAlpha = fade;
          ctx.fillStyle = accent;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 0.35, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.globalAlpha = fade * (particle.hot ? 0.34 : 0.2);
          ctx.drawImage(
            sprite,
            particle.x - particle.size / 2,
            particle.y - particle.size / 2,
            particle.size,
            particle.size,
          );
        }
        ctx.globalAlpha = 1;
      }

      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      root.removeEventListener("pointermove", onMove);
    };
  }, [canvasRef, rootRef]);
}

function hexAlpha(hex: string, alpha: number) {
  const value = hex.replace("#", "");
  if (value.length !== 6) return `rgba(246, 243, 236, ${alpha})`;
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function InstagramDirectory() {
  const rootRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useBluntSmoke(rootRef, canvasRef);

  return (
    <section ref={rootRef} className="ig-board border-t border-fg/10" aria-label="Instagram">
      <canvas ref={canvasRef} className="ig-smoke" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <p className="kicker text-accent">Contact for more details</p>
        <div className="ig-grid mt-8 sm:grid-cols-2 lg:grid-cols-4">
          {CONTACTS.map((profile) => (
            <ProfileLink key={profile.handle} handle={profile.handle} />
          ))}
        </div>
        <p className="kicker mt-16 text-accent sm:mt-20">The shops</p>
        <div className="ig-grid mt-8 max-w-3xl sm:grid-cols-2">
          {SHOPS.map((profile) => (
            <ProfileLink key={profile.handle} handle={profile.handle} />
          ))}
        </div>
      </div>
    </section>
  );
}
