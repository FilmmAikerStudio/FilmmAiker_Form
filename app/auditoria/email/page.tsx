import { Suspense } from "react";
import { EmailGateScreen } from "./EmailGateScreen";

export const metadata = {
  title: "Auditoría · Email | AltafuIA",
};

export default function EmailGatePage() {
  return (
    <Suspense fallback={<div className="min-h-[100svh]" aria-hidden />}>
      <EmailGateScreen />
    </Suspense>
  );
}
