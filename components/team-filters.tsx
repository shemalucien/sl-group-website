"use client"
import { useRouter, useSearchParams } from "next/navigation"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TeamFiltersProps {
  subsidiaries: {
    id: number
    name: string
    slug: string
    isActive: boolean
  }[]
}

export function TeamFilters({ subsidiaries }: TeamFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentRole = searchParams.get("role") || "all"
  const currentSubsidiary = searchParams.get("subsidiary") || "all"

  // Filter active subsidiaries
  const activeSubsidiaries = subsidiaries.filter((sub) => sub.isActive)

  const handleRoleChange = (value: string) => {
    const params = new URLSearchParams(searchParams)
    if (value === "all") {
      params.delete("role")
    } else {
      params.set("role", value)
    }
    router.push(`?${params.toString()}`, { scroll: false })
  }

  const handleSubsidiaryChange = (value: string) => {
    const params = new URLSearchParams(searchParams)
    if (value === "all") {
      params.delete("subsidiary")
    } else {
      params.set("subsidiary", value)
    }
    router.push(`?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-10">
      <div className="flex flex-col items-center md:items-start gap-2">
        <span className="text-sm font-medium">Filter by Role:</span>
        <Tabs value={currentRole} onValueChange={handleRoleChange} className="w-full">
          <TabsList className="grid grid-cols-2 w-[300px]">
            <TabsTrigger value="all">All Team</TabsTrigger>
            <TabsTrigger value="leadership">Leadership</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex flex-col items-center md:items-start gap-2">
        <span className="text-sm font-medium">Filter by Subsidiary:</span>
        <Select value={currentSubsidiary} onValueChange={handleSubsidiaryChange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select Subsidiary" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Subsidiaries</SelectItem>
            {activeSubsidiaries.map((subsidiary) => (
              <SelectItem key={subsidiary.id} value={subsidiary.slug}>
                {subsidiary.name}
              </SelectItem>
            ))}
            <SelectItem value="corporate">Corporate (No Subsidiary)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
