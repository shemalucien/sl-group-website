import { db } from "@/db"
import { subsidiaries, testimonials,teamMembers} from "@/db/schema"
import { eq, and, gte, lte, desc, asc, like, count, sum } from "drizzle-orm"
import { cache } from "react"

import * as dotenv from "dotenv";

dotenv.config();

// // Use React's cache to avoid duplicate requests
// export const getSubsidiaries = cache(async () => {
//   try {
//     const data = await db.query.subsidiaries.findMany({
//       with: {
//         services: true,
//       },
//     })

//     return data
//   } catch (error) {
//     console.error("Error fetching subsidiaries:", error)
//     return []
//   }
// })

// // Use React's cache to avoid duplicate requests
// export const getSubsidiaries = cache(async () => {
//   try {
//     const data = await db.query.subsidiaries.findMany({
//       with: {
//         services: true,
//         parent: true,
//         children: true,
//       },
//     })

//     return data
//   } catch (error) {
//     console.error("Error fetching subsidiaries:", error)
//     return []
//   }
// })

// export const getSubsidiaryBySlug = cache(async (slug: string) => {
//   try {
//     const data = await db.query.subsidiaries.findFirst({
//       where: eq(subsidiaries.slug, slug),
//       with: {
//         services: true,
//         testimonials: true,
//       },
//     })

//     return data
//   } catch (error) {
//     console.error(`Error fetching subsidiary ${slug}:`, error)
//     return null
//   }
// })


// Use React's cache to avoid duplicate requests
export const getSubsidiaries = cache(async () => {
  try {
    // Fetch all subsidiaries
    const allSubsidiaries = await db.query.subsidiaries.findMany();
    
    // Fetch services for each subsidiary
    const data = await Promise.all(
      allSubsidiaries.map(async (sub) => {
        const services = await db.query.services.findMany({
          where: eq(subsidiaries.id, sub.id),
        });
        
        // Find children
        const children = allSubsidiaries.filter(
          child => child.parentId === sub.id
        );
        
        // Find parent
        const parent = sub.parentId 
          ? allSubsidiaries.find(p => p.id === sub.parentId) || null 
          : null;
          
        return {
          ...sub,
          services,
          children,
          parent,
        };
      })
    );

    return data;
  } catch (error) {
    console.error("Error fetching subsidiaries:", error);
    return [];
  }
});

export const getSubsidiaryBySlug = cache(async (slug: string) => {
  try {
    // Fetch the subsidiary by slug
    const subsidiary = await db.query.subsidiaries.findFirst({
      where: eq(subsidiaries.slug, slug),
    });
    
    if (!subsidiary) return null;
    
    // Fetch services
    const services = await db.query.services.findMany({
      where: eq(subsidiaries.id, subsidiary.id),
    });

    // // Fetch testimonials
    // const testimonials = await db.query.testimonials.findMany({
    //   where: eq(testimonials.subsidiaryId, subsidiary.id),
    // });
    
    
    // Fetch all subsidiaries to find parent and children
    const allSubsidiaries = await db.query.subsidiaries.findMany();
    
    // Find children
    const children = allSubsidiaries.filter(
      child => child.parentId === subsidiary.id
    );
    
    // Find parent
    const parent = subsidiary.parentId 
      ? allSubsidiaries.find(p => p.id === subsidiary.parentId) || null 
      : null;
  
    // Return the subsidiary with its services, testimonials, children, and parent
    
    return {
      ...subsidiary,
      services,
      testimonials,
      children,
      parent,
    };
  } catch (error) {
    console.error(`Error fetching subsidiary ${slug}:`, error);
    return null;
  }
});

// export const getSubsidiaryServices = cache(async (subsidiaryId: number) => {
//   try {
//     const data = await db.query.subsidiaries.findFirst({
//       where: eq(subsidiaries.id, subsidiaryId),
//       with: {
//         services: true,
//       },
//     })
//     return data?.services || []
//   } catch (error) {
//     console.error(`Error fetching services for subsidiary ${subsidiaryId}:`, error)
//     return []
//   }
// })

export const getSubsidiaryServices = cache(async (subsidiaryId: number) => {
  try {
    // Fetch the subsidiary with its services
    const subsidiary = await db.query.subsidiaries.findFirst({
      where: eq(subsidiaries.id, subsidiaryId),
      with: {
        services: true,
      },
    });
    
    // Separately fetch parent if it exists
    let parent = null;
    if (subsidiary?.parentId) {
      parent = await db.query.subsidiaries.findFirst({
        where: eq(subsidiaries.id, subsidiary.parentId),
      });
    }
    
    // Fetch children subsidiaries
    const children = await db.query.subsidiaries.findMany({
      where: eq(subsidiaries.parentId, subsidiaryId),
    });
    
    return {
      services: subsidiary?.services || [],
      parent: parent,
      children: children,
      subsidiary: subsidiary || null,
    };
  } catch (error) {
    console.error(`Error fetching services for subsidiary ${subsidiaryId}:`, error);
    return {
      services: [],
      parent: null,
      children: [],
      subsidiary: null,
    };
  }
});

export const getTestimonials = cache(async (subsidiaryId?: number) => {
  try {
    if (subsidiaryId) {
      return await db.query.testimonials.findMany({
        where: eq(testimonials.subsidiaryId, subsidiaryId),
      })
    }

    // Get all testimonials if no subsidiaryId is provided
    return await db.query.testimonials.findMany({
      with: {
        subsidiary: true,
      },
    })
  } catch (error) {
    console.error("Error fetching testimonials:", error)
    return []
  }
})


// Team members related queries
export async function getTeamMembers(limit?: number) {
  const query = db.query.teamMembers.findMany({
    where: eq(teamMembers.isActive, true),
    orderBy: [desc(teamMembers.isLeadership), teamMembers.order],
    limit: limit ?? undefined,
    with: {
      subsidiary: true,
    },
  })

  // if (limit) {
  //   return query.limit(limit)
  // }

  return query
}

export async function getTeamMemberById(id: number) {
  return db.query.teamMembers.findFirst({
    where: eq(teamMembers.id, id),
    with: {
      subsidiary: true,
    },
  })
}

export async function getLeadershipTeam() {
  return db.query.teamMembers.findMany({
    where: and(eq(teamMembers.isActive, true), eq(teamMembers.isLeadership, true)),
    orderBy: [teamMembers.order],
    with: {
      subsidiary: true,
    },
  })
}

export async function getTeamMembersByDepartment(department: string) {
  return db.query.teamMembers.findMany({
    where: and(eq(teamMembers.isActive, true), eq(teamMembers.department, department)),
    orderBy: [desc(teamMembers.isLeadership), teamMembers.order],
    with: {
      subsidiary: true,
    },
  })
}

export async function getTeamMembersBySubsidiary(subsidiaryId: number) {
  return db.query.teamMembers.findMany({
    where: and(eq(teamMembers.isActive, true), eq(teamMembers.subsidiaryId, subsidiaryId)),
    orderBy: [desc(teamMembers.isLeadership), teamMembers.order],
    with: {
      subsidiary: true,
    },
  })
}

// Team Members
export async function getTeamMembersWithParams({
  featured = false,
  limit = 100,
  offset = 0,
  sortBy = "name",
  sortOrder = "asc",
} = {}) {
  try {
    const query = db.select().from(teamMembers)

    // Apply featured filter if specified
    if (featured) {
      query.where(eq(teamMembers.featured, true))
    }

    // // Apply sorting
    // if (sortOrder === "asc") {
    //   query.orderBy(asc(teamMembers[sortBy as keyof typeof teamMembers]))
    // } else {
    //   query.orderBy(desc(teamMembers[sortBy as keyof typeof teamMembers]))
    // }

    // Apply pagination
    query.limit(limit).offset(offset)

    const result = await query
    return result
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch team members.")
  }
}

export async function getTeamMemberByIdString(id: string) {
  try {
    const result = await db.select().from(teamMembers).where(eq(teamMembers.id, Number(id))).limit(1)

    return result[0] || null
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch team member.")
  }
}

export async function getFeaturedTeamMembers(limit = 3) {
  return getTeamMembersWithParams({ featured: true, limit })
}
