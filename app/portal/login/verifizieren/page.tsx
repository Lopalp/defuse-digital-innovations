"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";

function VerifizierenContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center px-6">
      <div className="w-full max-w-sm text-center">
        {/* Clean icon */}
        <div className="w-14 h-14 rounded-2xl bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] flex items-center justify-center mx-auto mb-6">
          <Mail className="w-6 h-6 text-gray-400" />
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-3">
          Prüfen Sie Ihr Postfach
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">
          Wir haben einen Login-Link an{" "}
          <span className="font-medium text-gray-900">{email}</span> gesendet.
          Klicken Sie auf den Link in der E-Mail, um sich anzumelden.
        </p>

        <p className="text-xs text-gray-400 mt-8">
          Der Link ist 15 Minuten gültig. Schauen Sie auch im Spam-Ordner nach.
        </p>

        <Link
          href="/portal/login"
          className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-900 transition-colors mt-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück zum Login
        </Link>
      </div>
    </div>
  );
}

export default function VerifizierenPage() {
  return (
    <Suspense>
      <VerifizierenContent />
    </Suspense>
  );
}
