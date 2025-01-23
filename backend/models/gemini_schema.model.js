import { SchemaType } from "@google/generative-ai";

export const gemini_schema = {
    description: "Personal Information",
    type: SchemaType.OBJECT,
    properties: {
        firstName: {
            type: SchemaType.STRING,
            description: "First Name of the person",
            nullable: false,
        },
        lastName: {
            type: SchemaType.STRING,
            description: "Last Name of the person",
            nullable: false,
        },
        phone: {
            type: SchemaType.STRING,
            description: "Phone number of the person",
        },
        email: {
            type: SchemaType.STRING,
            description: "Email address of the person",
            nullable: false,
        },
        linkedinUrl: {
            type: SchemaType.STRING,
            description: "LinkedIn URL of the person",
        },
        githubUrl: {
            type: SchemaType.STRING,
            description: "GitHub URL of the person",
        },
        portfolioWebsite: {
            type: SchemaType.STRING,
            description: "Portfolio Website URL of the person",
        },
        address: {
            type: SchemaType.OBJECT,
            description: "Address of the person",
            properties: {
                address1: {
                    type: SchemaType.STRING,
                    description: "Address Line 1",
                    nullable: false,
                },
                address2: {
                    type: SchemaType.STRING,
                    description: "Address Line 2",
                },
                city: {
                    type: SchemaType.STRING,
                    description: "City",
                    nullable: false,
                },
                state: {
                    type: SchemaType.STRING,
                    description: "State",
                    nullable: false,
                },
                country: {
                    type: SchemaType.STRING,
                    description: "Country",
                    nullable: false,
                },
                pincode: {
                    type: SchemaType.STRING,
                    description: "Postal Code",
                    nullable: false,
                },
            },
            required: ["address1", "address2", "city", "state", "country", "pincode"],
        },
        education: {
            type: SchemaType.ARRAY,
            description: "List of educational qualifications",
            items: {
                type: SchemaType.OBJECT,
                properties: {
                    institution: {
                        type: SchemaType.OBJECT,
                        properties: {
                            name: {
                                type: SchemaType.STRING,
                                description: "Name of the institution",
                                nullable: false,
                            },
                            degree: {
                                type: SchemaType.STRING,
                                description: "Degree obtained",
                                nullable: false,
                            },
                            marksOrCgpa: {
                                type: SchemaType.NUMBER,
                                description: "Marks or CGPA obtained"
                            },
                            timeline: {
                                type: SchemaType.OBJECT,
                                description: "Timeline of education",
                                properties: {
                                    start: {
                                        type: SchemaType.STRING,
                                        description: "Start date"
                                    },
                                    end: {
                                        type: SchemaType.STRING,
                                        description: "End date"
                                    },
                                },
                                required: ["start", "end"]
                            },
                        },
                        required: ["name", "degree", "timeline"],
                    },
                },
            },
        },
        workExperience: {
            type: SchemaType.ARRAY,
            description: "List of work experiences",
            items: {
                type: SchemaType.OBJECT,
                properties: {
                    title: {
                        type: SchemaType.STRING,
                        description: "Job title",
                        nullable: false,
                    },
                    companyName: {
                        type: SchemaType.STRING,
                        description: "Company name",
                        nullable: false,
                    },
                    timeline: {
                        type: SchemaType.OBJECT,
                        description: "Timeline of employment",
                        properties: {
                            start: {
                                type: SchemaType.STRING,
                                description: "Start date",
                            },
                            end: {
                                type: SchemaType.STRING,
                                description: "End date",
                            },
                        },
                        required: ["start", "end"]
                    },
                    detailsAboutWork: {
                        type: SchemaType.STRING,
                        description: "Details about the work",
                    },
                },
                required: ["title", "companyName", "timeline"],
            },
        },
        skills: {
            type: SchemaType.ARRAY,
            description: "List of skills",
            items: {
                type: SchemaType.STRING,
            },
        },
        projects: {
            type: SchemaType.ARRAY,
            description: "List of projects",
            items: {
                type: SchemaType.OBJECT,
                properties: {
                    project: {
                        type: SchemaType.OBJECT,
                        properties: {
                            title: {
                                type: SchemaType.STRING,
                                description: "Project title",
                                nullable: false,
                            },
                            description: {
                                type: SchemaType.ARRAY,
                                description: "Project description",
                                items: {
                                    type: SchemaType.STRING,
                                },
                            },
                            technologiesUsed: {
                                type: SchemaType.ARRAY,
                                description: "Technologies used in the project",
                                items: {
                                    type: SchemaType.STRING,
                                },
                            },
                            link: {
                                type: SchemaType.OBJECT,
                                description: "Project links",
                                properties: {
                                    deployment: {
                                        type: SchemaType.STRING,
                                        description: "Deployment URL",
                                    },
                                    projectLink: {
                                        type: SchemaType.STRING,
                                        description: "Project link (e.g., GitHub repository)",
                                        nullable: false,
                                    },
                                },
                                required: ["projectLink"],
                            },
                        },
                        required: ["title", "description", "technologiesUsed", "link"],
                    },
                },
            },
        },
        achievements: {
            type: SchemaType.ARRAY,
            description: "List of achievements",
            items: {
                type: SchemaType.STRING,
            },
        },
    },
    required: [
        "firstName",
        "lastName",
        "email",
        "address",
        "education",
        "workExperience",
        "skills",
        "projects",
    ],
};