import { redirect } from "next/navigation";
import { defaultLang } from "./i18n/config";

export default function Home() {
  redirect(`/${defaultLang}`);
}
