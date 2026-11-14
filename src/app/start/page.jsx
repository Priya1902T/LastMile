import AppShell from "@/components/AppShell";
import IntakeFlow from "@/components/IntakeFlow";

export const metadata = { title: "Start your prep · Scoped" };

export default function StartPage() {
  return (
    <AppShell>
      <IntakeFlow />
    </AppShell>
  );
}
