import { gemini_data } from "../controllers/gemini.js"


export async function resume_object(filename) {
    const resume_data = await gemini_data(filename);
    const resume_data_object = {
        firstName: resume_data.firstName,
        lastName: resume_data.lastName,
        phone: resume_data.phone,
        email: resume_data.email,
        linkedinUrl: resume_data.linkedinUrl,
        githubUrl: resume_data.githubUrl,
        portfolioWebsite: resume_data.portfolioWebsite,
        address: {
            address1: resume_data.address.address1,
            address2: resume_data.address.address2,
            city: resume_data.address.city,
            state: resume_data.address.state,
            country: resume_data.address.country,
            pincode: resume_data.address.pincode,
        },
        education: resume_data.education.map(edu => ({
            institution: {
                name: edu.institution.name,
                degree: edu.institution.degree,
                marksOrCgpa: edu.institution.marksOrCgpa,
                timeline: {
                    start: edu.institution.timeline.start,
                    end: edu.institution.timeline.end,
                },
            },
        })),
        workExperience: resume_data.workExperience.map(work => ({
            title: work.title,
            companyName: work.companyName,
            timeline: {
                start: work.timeline.start,
                end: work.timeline.end,
            },
            detailsAboutWork: work.detailsAboutWork,
        })),
        skills: resume_data.skills,
        projects: resume_data.projects.map(project => ({
            project: {
                title: project.project.title,
                description: project.project.description,
                technologiesUsed: project.project.technologiesUsed,
                link: {
                    deployment: project.project.link.deployment,
                    projectLink: project.project.link.projectLink,
                },
            },
        })),
        achievements: resume_data.achievements,
    }
    return resume_data_object;
}

