import React, { useState, useCallback } from 'react';
import {
    Container,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    TextField,
    Checkbox,
    FormControlLabel,
    Button,
    IconButton,
    Typography,
    Grid,
    MenuItem,
} from '@mui/material';
import { ExpandMore, Add, Delete } from '@mui/icons-material';
import {axiosApi, myDefaultProfile, showInformation} from "./utilis";
import FileUploadButton from "./FileUploadButton";

const initialProfile =myDefaultProfile|| {
    lastName: '',
    firstName: '',
    titles: [''],
    aboutMe: '',
    mobile: [''],
    emails: [''],
    addresses: [''],
    status: { title: '', isVisible: true },
    educations: [{ title: '', schools: '', diploma: '', timeline: { start: '', end: '' }, descriptions: [''], file: '' }],
    experiences: [{ title: '', company: '', diploma: '', timeline: { start: '', end: '' }, descriptions: [''], projects: [''], techs: [''], file: '' }],
    skills: [{ title: '', level: 0 }],
    languages: [{ title: '', level: 0 }],
    publications: [{ title: '', link: "" }],
    socialMedia: [{ type: '', link: "" }],
    moreDetails: [{ title: '', description: '' }],
    interests: [''],
};

// Reusable InputField component
const InputField: React.FC<{ label: string; value: string | number; onChange: (value: string | number) => void; type?: string }> = ({ label, value, onChange, type = 'text' }) => (
    <TextField
        label={label}
        value={value}
        onChange={(e) => onChange(type === 'number' ? parseFloat(e.target.value) : e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
        type={type}
    />
);

// New SelectField component
const SelectField: React.FC<{ label: string; value: string; options: string[]; onChange: (value: string) => void }> = ({ label, value, options, onChange }) => (
    <TextField
        label={label}
        select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
    >
        {options.map((option) => (
            <MenuItem key={option} value={option}>
                {option}
            </MenuItem>
        ))}
    </TextField>
);

// DynamicField component to handle different field types
const DynamicField: React.FC<{ label: string; field: string; value: any; onChange: (value: any) => void }> = ({ label, field, value, onChange }) => {
    if (typeof value === 'string' || typeof value === 'number') {
        const type = field.toLowerCase().includes('date') ? 'date' : typeof value === 'number' ? 'number' : 'text';
        return <InputField label={label} value={value} onChange={onChange} type={type} />;
    }
    if (typeof value === 'boolean') {
        return (
            <FormControlLabel
                control={<Checkbox checked={value} onChange={(e) => onChange(e.target.checked)} />}
                label={label}
            />
        );
    }
    if (field === 'file') {
        return (
            <Button
                variant="contained"
                component="label"
                fullWidth
            >
                {label}
                <input
                    type="file"
                    hidden
                    onChange={(e) => onChange(e.target.files ? e.target.files[0] : null)}
                />
            </Button>
        );
    }
    if (Array.isArray(value)) {
        return (
            <Grid container direction="column">

                {value.map((item, index) => (
                    <Grid item key={index} style={{ display: 'flex', alignItems: 'center' }}>
                        <DynamicField
                            label={`${label} ${index + 1}`}
                            field={field}
                            value={item}
                            onChange={(newValue) => {
                                const newItems = [...value];
                                newItems[index] = newValue;
                                onChange(newItems);
                            }}
                        />
                        <IconButton onClick={() => onChange(value.filter((_, i) => i !== index))}>
                            <Delete />
                        </IconButton>
                    </Grid>
                ))}
             <Grid p={2}> <Button
                 variant="outlined"
                 startIcon={<Add />}
                 onClick={() => onChange([...value, getDefaultValueForArrayItem(field)])}
             >
                 Add {label}
             </Button></Grid>
            </Grid>
        );
    }
    if (typeof value === 'object' && value !== null) {
        return (
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography> {label}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {Object.keys(value).map((key) => (
                        <DynamicField
                            key={key}
                            label={key}
                            field={key}
                            value={value[key]}
                            onChange={(newValue) => onChange({ ...value, [key]: newValue })}
                        />
                    ))}
                </AccordionDetails>
            </Accordion>
        );
    }
    return null;
};

// Default value generator for array items
const getDefaultValueForArrayItem = (field: string) => {
    switch (field) {
        case 'educations':
            return { title: '', schools: '', diploma: '', timeline: { start: '', end: '' }, descriptions: [''], file: '' };
        case 'experiences':
            return { title: '', company: '', diploma: '', timeline: { start: '', end: '' }, descriptions: [''], projects: [''], techs: [''], file: '' };
        case 'skills':
            return { title: '', level: 0 };
        case 'languages':
            return { title: '', level: 0 };
        case 'publications':
            return { title: '', link: '' };
        case 'socialMedia':
            return { type: '', link: '' };
        case 'moreDetails':
            return { title: '', description: '' };
        case 'interests':
        case 'titles':
        case 'mobile':
        case 'emails':
        case 'addresses':
        case 'descriptions':
        case 'projects':
        case 'techs':
        case 'articles':
            return '';
        default:
            return {};
    }
};
interface ProfileSectionProps {
    title: string;
    fields: { [key: string]: any };
    onChange: (field: string, value: any) => void;
}
// ProfileSection component for grouping related fields
const ProfileSection: React.FC<ProfileSectionProps> = ({ title, fields, onChange }) => (
    <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Grid container direction="column">
                {Object.keys(fields).map((key) => (
                    <DynamicField
                        key={key}
                        label={key}
                        field={key}
                        value={fields[key]}
                        onChange={(value) => onChange(key, value)}
                    />
                ))}
            </Grid>
        </AccordionDetails>
    </Accordion>
);

const DynamicCVBuilder= (props:{editMyCv:any,onClose:any}):any => {
    const [profile, setProfile] = useState(props?.editMyCv? JSON.parse(props?.editMyCv?.content):initialProfile);
    const [mycv, setMycv] = useState(props?.editMyCv? {...props.editMyCv,content:null}: {
        title: null,
    //    content:profile,// JSON.stringify(myDefaultProfile, null, 4) || "",
        language: "english",
        fileUrl: null,
        photoUrl: null,
    })
    const [loading, setLoading] = React.useState(false);
    const [config, setConfig] = useState({
        headers: {
            // "Content-Type": "application/json",
            "Content-Type": "multipart/form-data",
        },
    });
    const handleSubmit = async (edit: any) => {
        const formData = new FormData();

        if (mycv?.fileUrl) formData.append("file", mycv.fileUrl);
        if (mycv?.photoUrl) formData.append("photo", mycv.photoUrl);
        if (mycv?.title) formData.append("title", mycv.title);
        if (profile) formData.append("content", JSON.stringify(profile));
        if (mycv?.language) formData.append("language", mycv.language);


        try {

            let response;

            if (edit != null) {
                // Update existing post

                response = await axiosApi.put(`/mycvs/${edit.id}`, formData, config);
                showInformation(JSON.stringify(response))
            } else {

                // Create new post
                response = await axiosApi.post("/mycvs/", formData, config);
            }


            return response.data.body;
        } catch (error: any) {
            if (error.response) {
                showInformation(error.response.data);
            } else {
                showInformation(JSON.stringify(error) + "An error occurred while processing the story.");
            }
            throw new Error(error.response.data.body);
        }
    };
    const handleSaveBtnClick = async () => {
        setLoading(true);
        try {

            const data = await handleSubmit(props?.editMyCv);
            setLoading(false);
            props?.onClose();
        } catch (err) {
            setLoading(false);
        }
    };
    const [fileUrl, setFileUrl] = useState<any>(null)
    const [photoUrl, setPhotoUrl] = useState<any>(null)
    const handleFileSelect = (file: any) => {

        // Generate temporary URL for the selected image
        setFileUrl(URL.createObjectURL(file));
        setMycv({...mycv, fileUrl: file});
    }
    const handlePhotoSelect = (file2: any) => {

        // Generate temporary URL for the selected image
        setPhotoUrl(URL.createObjectURL(file2));
        setMycv({...mycv, photoUrl: file2});
    };


    const handleProfileChange = useCallback((field: string, value: any) => {
        setProfile((prev:any) => ({ ...prev, [field]: value }));
    }, []);

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "grid",
                gridTemplateColumns: "calc(100% - 270px) 270px",
            }}
        >

            <div style={{padding: "0px 10px",overflow:"auto"}}>
                <Container>

                    <ProfileSection
                        title="Personal Details"
                        fields={{lastName: profile.lastName, firstName: profile.firstName, aboutMe: profile.aboutMe,}}
                        onChange={handleProfileChange}
                    />
                    <ProfileSection
                        title="Contact Information"
                        fields={{mobile: profile.mobile, emails: profile.emails, addresses: profile.addresses}}
                        onChange={handleProfileChange}
                    />
                    <ProfileSection
                        title="Social Media"
                        fields={{socialMedia: profile.socialMedia, }}
                        onChange={handleProfileChange}
                    />
                    <ProfileSection
                        title="Titles and Status"
                        fields={{titles: profile.titles, status: profile.status}}
                        onChange={handleProfileChange}
                    />
                    <ProfileSection
                        title="Educations"
                        fields={{educations: profile.educations}}
                        onChange={handleProfileChange}
                    />
                    <ProfileSection
                        title="Experiences"
                        fields={{experiences: profile.experiences}}
                        onChange={handleProfileChange}
                    />
                    <ProfileSection
                        title="Skills"
                        fields={{skills: profile.skills}}
                        onChange={handleProfileChange}
                    />
                    <ProfileSection
                        title="Languages"
                        fields={{languages: profile.languages}}
                        onChange={handleProfileChange}
                    />
                    <ProfileSection
                        title="Publications"
                        fields={{publications: profile.publications}}
                        onChange={handleProfileChange}
                    />
                    <ProfileSection
                        title="More Details"
                        fields={{moreDetails: profile.moreDetails}}
                        onChange={handleProfileChange}
                    />
                    <ProfileSection
                        title="Interests"
                        fields={{interests: profile.interests}}
                        onChange={handleProfileChange}
                    />
                </Container>
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: 'space-between',

                    alignItems: "center",
                    flexDirection: "column",

                }}
            >
                <div style={{rowGap: "10px", display: "flex", flexDirection: "column"}}><TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    label="CV title"
                    placeholder="CV title"
                    value={mycv?.title}
                    onChange={(e) => setMycv({...mycv, title: e.target.value})}
                />
                    <TextField
                        fullWidth
                        size="small"
                        variant="outlined"
                        label="CV Language"
                        placeholder="CV Language"
                        value={mycv?.language}
                        onChange={(e) => setMycv({...mycv, language: e.target.value})}
                    />
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: "center",
                        width: "100%",
                        flexDirection: "column"
                    }}>
                        <FileUploadButton style={{zIndex: 1}}
                                          onFileSelect={handlePhotoSelect} text={"Upload your Photo"}/>


                        <img
                            alt={""}
                            src={photoUrl}

                            style={{width: "80px", height: "80px"}}
                        />


                    </div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: "center",
                        width: "100%",
                        flexDirection: "column"
                    }}>
                        <FileUploadButton style={{zIndex: 1}}
                                          onFileSelect={handleFileSelect} text={"Upload Cv"}/>


                        <embed

                            src={fileUrl}

                            style={{width: "100%", height: "400px"}}
                        />


                    </div>
                </div>


                <div style={{justifyContent: "right", display: "flex", width: '100%', padding: "10px"}}>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            handleSaveBtnClick();
                        }}
                    >
                        Save
                    </Button>
                </div>
            </div>
        </div>

)
    ;
};

export default DynamicCVBuilder;
