import mongoose from "mongoose";

const SchemaType = mongoose.Schema.Types;

const resume_info = new mongoose.Schema({
    firstName: {
        type: SchemaType.String,
        required: true,
        description: 'First Name of the person',
    },
    lastName: {
        type: SchemaType.String,
        required: true,
        description: 'Last Name of the person',
    },
    phone: {
        type: SchemaType.String,
        description: 'Phone number of the person',
    },
    email: {
        type: SchemaType.String,
        required: true,
        description: 'Email address of the person',
    },
    linkedinUrl: {
        type: SchemaType.String,
        description: 'LinkedIn URL of the person',
    },
    githubUrl: {
        type: SchemaType.String,
        description: 'GitHub URL of the person',
    },
    portfolioWebsite: {
        type: SchemaType.String,
        description: 'Portfolio Website URL of the person',
    },
    address: {
        address1: {
            type: SchemaType.String,
            required: true,
            description: 'Address Line 1',
        },
        address2: {
            type: SchemaType.String,
            description: 'Address Line 2',
        },
        city: {
            type: SchemaType.String,
            required: true,
            description: 'City',
        },
        state: {
            type: SchemaType.String,
            required: true,
            description: 'State',
        },
        country: {
            type: SchemaType.String,
            required: true,
            description: 'Country',
        },
        pincode: {
            type: SchemaType.Number,
            description: 'Postal Code',
        },
    },
    education: [{
        institution: {
            name: {
                type: SchemaType.String,
                required: true,
                description: 'Name of the institution',
            },
            degree: {
                type: SchemaType.String,
                required: true,
                description: 'Degree obtained',
            },
            marksOrCgpa: {
                type: SchemaType.Number,
                description: 'Marks or CGPA obtained',
            },
            timeline: {
                start: {
                    type: SchemaType.String,
                    required: true,
                    description: 'Start date',
                },
                end: {
                    type: SchemaType.String,
                    required: true,
                    description: 'End date',
                },
            },
        },
    }],
    workExperience: [{
        title: {
            type: SchemaType.String,
            required: true,
            description: 'Job title',
        },
        companyName: {
            type: SchemaType.String,
            required: true,
            description: 'Company name',
        },
        timeline: {
            start: {
                type: SchemaType.String,
                required: true,
                description: 'Start date',
            },
            end: {
                type: SchemaType.String,
                description: 'End date',
            },
        },
        detailsAboutWork: {
            type: SchemaType.String,
            description: 'Details about the work',
        },
    }],
    skills: [{
        type: SchemaType.String,
    }],
    projects: [{
        project: {
            title: {
                type: SchemaType.String,
                required: true,
                description: 'Project title',
            },
            description: [{
                type: SchemaType.String,
            }],
            technologiesUsed: [{
                type: SchemaType.String,
            }],
            link: {
                deployment: {
                    type: SchemaType.String,
                    description: 'Deployment URL',
                },
                projectLink: {
                    type: SchemaType.String,
                    description: 'Project link (e.g., GitHub repository)',
                },
            },
        },
    }],
    achievements: [{
        type: SchemaType.String,
    }],
}, {
    description: 'Personal Information',
});

const resume_details = mongoose.model('resume_details', resume_info);

export {resume_details};