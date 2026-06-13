import { themes } from "@/lib/themes"
import { ThemePageClient } from "./theme-page-client"
import { notFound } from "next/navigation"

export function generateStaticParams() {
  return themes.map((theme) => ({
    id: theme.id,
  }))
}

interface ThemePageProps {
  params: Promise<{ id: string }>
}

export default async function ThemePage({ params }: ThemePageProps) {
  const { id } = await params
  const theme = themes.find((t) => t.id === id)
  
  if (!theme) {
    notFound()
  }

  return <ThemePageClient theme={theme} />
}
