import { Button } from "./components/ui/button";

function Swatch({ name, hex }: { name: string; hex: string }) {
  return (
    <div className="flex flex-col gap-3">
      <div
        className="h-24 w-24 rounded-xl border border-border"
        style={{ background: hex }}
      />
      <div>
        <div className="text-sm text-fg">{name}</div>
        <div className="font-mono text-xs text-fg-dim">{hex}</div>
      </div>
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-6 text-sm uppercase tracking-wider text-fg-dim">
      {children}
    </h2>
  );
}

function App() {
  return (
    <div className="mx-auto max-w-5xl px-12 py-16">
      <header className="mb-20">
        <img src="/aeros-logo.png" alt="AerOS" className="mb-12 h-12" />
        <h1 className="mb-4 text-5xl font-medium tracking-tight text-fg">
          The private OS for your business.
        </h1>
        <p className="text-lg text-fg-muted">
          Design calibration. Tokens locked 2026-05-17. Registry seeded
          with Button v0.1.
        </p>
      </header>

      <section className="mb-20">
        <SectionHeading>Rainbow</SectionHeading>
        <div className="flex flex-wrap gap-6">
          <Swatch name="Red" hex="#FA1E00" />
          <Swatch name="Yellow" hex="#FADC00" />
          <Swatch name="Green" hex="#28F082" />
          <Swatch name="Cyan" hex="#28BED2" />
        </div>
      </section>

      <section className="mb-20">
        <SectionHeading>Neutrals (dark)</SectionHeading>
        <div className="flex flex-wrap gap-6">
          <Swatch name="Background" hex="#2A2A2A" />
          <Swatch name="Surface" hex="#353537" />
          <Swatch name="Surface elevated" hex="#3F3F41" />
          <Swatch name="Border" hex="#48484A" />
          <Swatch name="Text dim" hex="#8E8E93" />
          <Swatch name="Text muted" hex="#AEAEB2" />
          <Swatch name="Text primary" hex="#F2F2F7" />
        </div>
      </section>

      <section className="mb-20">
        <SectionHeading>Typography (Lexend)</SectionHeading>
        <div className="space-y-6">
          <div className="text-6xl font-light tracking-tight">
            Display · 60 · 300
          </div>
          <div className="text-4xl font-medium tracking-tight">
            Heading 1 · 36 · 500
          </div>
          <div className="text-2xl font-medium">Heading 2 · 24 · 500</div>
          <div className="text-lg font-normal">Heading 3 · 18 · 400</div>
          <div className="text-base font-normal">
            Body · 16 · 400. Your CRM, your accounting system, and your
            spreadsheets are different rooms. AEROS makes them one room.
          </div>
          <div className="text-sm text-fg-muted">
            Caption · 14 · 400 muted
          </div>
        </div>
      </section>

      <section className="mb-20">
        <SectionHeading>Sample surface</SectionHeading>
        <div className="max-w-md rounded-2xl border border-border bg-surface p-8">
          <div className="mb-2 text-xs uppercase tracking-wider text-aeros-cyan">
            Connect
          </div>
          <h3 className="mb-2 text-2xl font-medium">Unify your data</h3>
          <p className="text-fg-muted">
            Transparent and verifiable. Your business in one room.
          </p>
        </div>
      </section>

      <section className="mb-20">
        <SectionHeading>Button — variants</SectionHeading>
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </section>

      <section className="mb-20">
        <SectionHeading>Button — sizes</SectionHeading>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </section>

      <section className="mb-20">
        <SectionHeading>Button — states</SectionHeading>
        <div className="flex flex-wrap items-center gap-4">
          <Button>Default</Button>
          <Button disabled>Disabled</Button>
          <Button loading>Loading</Button>
          <Button variant="secondary" disabled>
            Disabled secondary
          </Button>
          <Button variant="ghost" loading>
            Loading ghost
          </Button>
        </div>
        <p className="mt-4 text-sm text-fg-dim">
          Hover, focus (tab to it), and active (press) states are wired
          but only visible on interaction.
        </p>
      </section>
    </div>
  );
}

export default App;
