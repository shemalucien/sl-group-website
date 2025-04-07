import { db } from "@/db"
import { JobListingCard } from "@/components/job-listing-card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Briefcase } from "lucide-react"

export default async function CareersPage() {
  const jobListings = await db.query.jobListings.findMany({
    where: (jobListings, { eq }) => eq(jobListings.status, "open"),
    orderBy: (jobListings, { desc }) => [desc(jobListings.createdAt)],
    with: {
      subsidiary: true,
    },
  })

  // Get unique locations and departments for filters
  const locations = [...new Set(jobListings.map((job) => job.location))].filter((location): location is string => location !== null)
  const departments = [...new Set(jobListings.map((job) => job.department))].filter((department): department is string => department !== null)
  const subsidiaries = [...new Set(jobListings.map((job) => job.subsidiary.name))]

  return (
    <div className="container py-10">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
        <p className="text-xl text-muted-foreground">
          Discover exciting career opportunities across the SL Group of companies. We're looking for talented
          individuals to help us grow and innovate.
        </p>
      </div>

      <div className="bg-muted p-6 rounded-lg mb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search positions..." className="pl-9" />
          </div>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map((department) => (
                <SelectItem key={department} value={department}>
                  {department}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Subsidiary" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subsidiaries</SelectItem>
              {subsidiaries.map((subsidiary) => (
                <SelectItem key={subsidiary} value={subsidiary}>
                  {subsidiary}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-10">
        {departments.map((department) => (
          <section key={department}>
            <div className="flex items-center gap-2 mb-6">
              <Briefcase className="h-5 w-5" />
              <h2 className="text-2xl font-bold">{department}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobListings
                .filter((job) => job.department === department)
                .map((job) => (
                  <JobListingCard
                    key={job.id}
                    title={job.title}
                    location={job.location ?? ""}
                    type={job.employmentType.replace("_", " ")}
                    subsidiary={job.subsidiary.name}
                    slug={job.slug}
                  />
                ))}
            </div>
            <Separator className="my-10" />
          </section>
        ))}
      </div>

      <div className="bg-primary/5 p-8 rounded-lg mt-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Don't see a position that fits your skills?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          We're always looking for talented individuals to join our team. Send us your resume and we'll keep it on file
          for future opportunities.
        </p>
        <Button size="lg">Submit Your Resume</Button>
      </div>
    </div>
  )
}

