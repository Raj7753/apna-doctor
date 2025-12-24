import { useState } from "react";
import { consentApi } from "../lib/api";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Checkbox } from "../components/ui/checkbox";
import { toast } from "sonner";
import { Shield, AlertTriangle, CheckCircle, Loader2 } from "lucide-react";
import { useTheme } from "../hooks/useTheme.jsx";

const ConsentForm = ({ onConsentGiven }) => {
  const { isDark } = useTheme();
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!agreed) {
      toast.error("Please accept the terms to continue");
      return;
    }

    setLoading(true);

    try {
      await consentApi.record(true);
      toast.success("Consent recorded. Welcome to Apna Doctor!");
      onConsentGiven();
    } catch (error) {
      toast.error(error.message || "Error recording consent");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className={`${isDark ? 'border-slate-800 bg-slate-900/80' : 'border-slate-200 bg-white/90'} backdrop-blur-xl`}>
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white">
            <Shield className="h-8 w-8" />
          </div>
          <CardTitle className={`text-2xl ${isDark ? 'text-white' : 'text-slate-900'}`}>Important Health Disclaimer</CardTitle>
          <CardDescription className={isDark ? 'text-slate-400' : 'text-slate-600'}>
            Please read and accept the following terms before using Apna Doctor
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className={`space-y-4 rounded-xl border ${isDark ? 'border-slate-700 bg-slate-800/50' : 'border-slate-200 bg-slate-50'} p-6`}>
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
              <div>
                <h4 className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>Educational Tool Only</h4>
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Apna Doctor is an AI-powered educational demonstration tool. It is NOT a substitute
                  for professional medical advice, diagnosis, or treatment.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
              <div>
                <h4 className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>Not a Medical Professional</h4>
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  The AI analysis provided should not be considered as medical advice. Always consult
                  with qualified healthcare providers for health concerns.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
              <div>
                <h4 className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>Emergency Situations</h4>
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  In case of medical emergency, call emergency services immediately (112 in India).
                  Do not rely on this tool for emergencies.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
              <div>
                <h4 className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>Data Privacy</h4>
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Your health information is encrypted and stored securely. We do not share your
                  personal health data with third parties.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div className={`flex items-start gap-3 rounded-xl border ${isDark ? 'border-slate-700 bg-slate-800/30' : 'border-slate-200 bg-slate-50'} p-4`}>
              <Checkbox
                id="consent"
                checked={agreed}
                onCheckedChange={setAgreed}
                className={`mt-0.5 ${isDark ? 'border-slate-600' : 'border-slate-400'} data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500`}
              />
              <label htmlFor="consent" className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'} cursor-pointer`}>
                I understand that Apna Doctor is an educational tool only and not a substitute for
                professional medical advice. I agree to use this tool responsibly and seek
                professional help for any health concerns.
              </label>
            </div>

            <Button
              type="submit"
              disabled={!agreed || loading}
              className="w-full h-12 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold shadow-lg shadow-blue-500/25 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CheckCircle className="mr-2 h-5 w-5" />
                  I Understand & Accept
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConsentForm;
