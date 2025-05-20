import Link from "next/link"
import { notFound } from "next/navigation"
import { db } from "@/db"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { formatDate } from "@/lib/utils"
import { ArrowLeft, MapPin, Clock, Building, Calendar } from "lucide-react"

interface CareerDetailsPageProps {
  params: {
    slug: string
  }
}

export default async function CareerDetailsPage({ params }: CareerDetailsPageProps) {
  const { slug } = params

  const job = await db.query.jobListings.findFirst({
    where: (jobListings, { eq }) => eq(jobListings.slug, slug),
    with: {
      subsidiary: true,
    },
  })

  if (!job) {
    notFound()
  }

  // Format the deadline date
  const formattedDeadline = job.applicationDeadline ? formatDate(job.applicationDeadline) : "No deadline specified"

  return (
    <div className="container max-w-4xl py-10 space-y-8">
      <Link href="/careers" className="flex items-center text-muted-foreground hover:text-foreground">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to all jobs
      </Link>

      <div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">{job.title}</h1>
            <div className="flex items-center text-muted-foreground mt-2">
              <Building className="h-4 w-4 mr-1" />
              <span>{job.subsidiary.name}</span>
            </div>
          </div>
          <Button size="lg" className="md:self-start">
            Apply Now
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Card>
            <CardContent className="flex items-center p-4">
              <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">{job.location}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center p-4">
              <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Job Type</p>
                <p className="font-medium capitalize">{job.employmentType.replace("_", " ")}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center p-4">
              <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Application Deadline</p>
                <p className="font-medium">{formattedDeadline}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator />

      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold mb-4">Job Description</h2>
          <div className="prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: job.description }} />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Requirements</h2>
          <div className="prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: job.requirements || "" }} />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Benefits</h2>
          <div className="prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: job.benefits || "" }} />
          </div>
        </section>
      </div>

      <div className="bg-muted p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">How to Apply</h2>
        <p className="mb-6">
          Please submit your resume and cover letter through the application form by clicking the button below. Make
          sure to include "{job.title}" in the subject line.
        </p>
        <Button size="lg">Apply for this Position</Button>
      </div>

      <div className="text-center text-muted-foreground text-sm">
        <p>Posted on {job.createdAt ? formatDate(job.createdAt) : "N/A"}</p>
        <p>SL Group is an equal opportunity employer.</p>
      </div>
    </div>
  )
}

