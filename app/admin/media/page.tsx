import { db } from "@/db"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatDate, formatFileSize } from "@/lib/utils"
import { Upload, Grid, List, FolderPlus, Image, FileText, Film, Music, File } from 'lucide-react'

export default async function MediaLibraryPage() {
  const allMedia = await db.query.media.findMany({
    orderBy: (media, { desc }) => [desc(media.createdAt)],
    with: {
      user: true,
    },
  })

  // Group media by type
  const images = allMedia.filter(item => item.type.startsWith('image/'))
  const documents = allMedia.filter(item => 
    item.type.includes('pdf') || 
    item.type.includes('doc') || 
    item.type.includes('xls') || 
    item.type.includes('ppt') || 
    item.type.includes('txt')
  )
  const videos = allMedia.filter(item => item.type.startsWith('video/'))
  const audio = allMedia.filter(item => item.type.startsWith('audio/'))
  const other = allMedia.filter(item => 
    !item.type.startsWith('image/') && 
    !item.type.startsWith('video/') && 
    !item.type.startsWith('audio/') &&
    !item.type.includes('pdf') && 
    !item.type.includes('doc') && 
    !item.type.includes('xls') && 
    !item.type.includes('ppt') && 
    !item.type.includes('txt')
  )

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image className="h-6 w-6" />
    if (type.startsWith('video/')) return <Film className="h-6 w-6" />
    if (type.startsWith('audio/')) return <Music className="h-6 w-6" />
    if (type.includes('pdf') || type.includes('doc') || type.includes('txt')) return <FileText className="h-6 w-6" />
    return <File className="h-6 w-6" />
  }

  const MediaGrid = ({ items }: { items: typeof allMedia }) => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {items.map((item) => (
        <Card key={item.id} className="overflow-hidden">
          <div className="aspect-square relative bg-muted">
            {item.type.startsWith('image/') ? (
              <img
                src={item.url || "/placeholder.svg"}
                alt={item.name}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-muted">
                {getFileIcon(item.type)}
              </div>
            )}
          </div>
          <CardContent className="p-3">
            <div className="truncate font-medium">{item.name}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {formatFileSize(item.size)}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const MediaList = ({ items }: { items: typeof allMedia }) => (
    <div className="border rounded-md">
      <div className="grid grid-cols-12 gap-2 p-4 border-b font-medium">
        <div className="col-span-5">Name</div>
        <div className="col-span-2">Type</div>
        <div className="col-span-2">Size</div>
        <div className="col-span-2">Uploaded</div>
        <div className="col-span-1">Actions</div>
      </div>
      {items.map((item) => (
        <div key={item.id} className="grid grid-cols-12 gap-2 p-4 border-b hover:bg-muted/50">
          <div className="col-span-5 flex items-center gap-2">
            {getFileIcon(item.type)}
            <span className="truncate">{item.name}</span>
          </div>
          <div className="col-span-2 text-muted-foreground">{item.type.split('/')[1]}</div>
          <div className="col-span-2 text-muted-foreground">{formatFileSize(item.size)}</div>
          <div className="col-span-2 text-muted-foreground">{formatDate(item.createdAt)}</div>
          <div className="col-span-1">
            <Button variant="ghost" size="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <circle cx="12" cy="12" r="1" />
                <circle cx="19" cy="12" r="1" />
                <circle cx="5" cy="12" r="1" />
              </svg>
              <span className="sr-only">Open menu</span>
            </Button>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Media Library</h1>
        <div className="flex gap-2">
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Upload Files
          </Button>
          <Button variant="outline">
            <FolderPlus className="mr-2 h-4 w-4" />
            New Folder
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-5">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium">All Files</p>
          </div>
          <div className="text-2xl font-bold">{allMedia.length}</div>
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium">Images</p>
          </div>
          <div className="text-2xl font-bold">{images.length}</div>
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium">Documents</p>
          </div>
          <div className="text-2xl font-bold">{documents.length}</div>
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium">Videos</p>
          </div>
          <div className="text-2xl font-bold">{videos.length}</div>
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium">Audio</p>
          </div>
          <div className="text-2xl font-bold">{audio.length}</div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" className="h-8 gap-1">
          <Grid className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Grid View</span>
        </Button>
        <Button variant="outline" size="sm" className="h-8 gap-1">
          <List className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">List View</span>
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Files</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="audio">Audio</TabsTrigger>
          <TabsTrigger value="other">Other</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <MediaGrid items={allMedia} />
        </TabsContent>
        <TabsContent value="images" className="space-y-4">
          <MediaGrid items={images} />
        </TabsContent>
        <TabsContent value="documents" className="space-y-4">
          <MediaList items={documents} />
        </TabsContent>
        <TabsContent value="videos" className="space-y-4">
          <MediaList items={videos} />
        </TabsContent>
        <TabsContent value="audio" className="space-y-4">
          <MediaList items={audio} />
        </TabsContent>
        <TabsContent value="other" className="space-y-4">
          <MediaList items={other} />
        </TabsContent>
      </Tabs>
    </div>
  )
}