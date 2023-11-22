import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import  FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import useTheme from '@mui/material/styles/useTheme';

const ProfileComplete = () => {

    const { User, countryList, interestsList ,skillsList,setSpecials} = useContext(AuthContext);
    const [myInterests, setMyInterests] = React.useState([]);
    const [mySkills, setMySkills] = React.useState([]);
    const [MyCountry, setMyCountry] = React.useState('');
    const [MyBio, setMyBio] = React.useState('');
    const theme = useTheme();

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const handleInterestChange = (event) => {
        const {
            target: { value },
        } = event;
        setMyInterests(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleSkillsChange = (event) => {
        const {
            target: { value },
        } = event;
        setMySkills(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );

    };

    const getStyle = (name, list, theme) => {
        return {
            fontWeight: list.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
            backgroundColor: list.indexOf(name) === -1 ? theme.palette.background.paper : theme.palette.primary.main,
            color: list.indexOf(name) === -1 ? theme.palette.text.secondary : theme.palette.primary.contrastText,
        }
    };

    const UpdateUser = (e) => {
        e.preventDefault();

        
        
        let interestIds = [];
        let skillIds = [];
        let country = MyCountry;
        let bio = MyBio;
        interestsList.forEach((interest) => {
            if (myInterests.includes(interest.title)) {
                interestIds.push(interest.id);
            }
        });
        skillsList.forEach((skill) => {
            if (mySkills.includes(skill.title)) {
                skillIds.push(skill.id);
            }
        });

        const specials =  {
            country,
            bio,
            interests:interestIds,
            skills:skillIds
        }
        setSpecials(specials)
        .then((res)=>{
            console.log(res.data);
        })
        
        

    }

    const handleCountry = (e) => {
        setMyCountry(e.target.value);
    }

    const handleBio = (e) => {
        setMyBio(e.target.value);
    }


    
    return (
        <div className='complete_main'>
            <div className="complete_top">
                <div className="image">
                    <img alt="user_photo" src={User.picture} width={70} height={70} />
                </div>
                <div>{User.username}</div>
                <div>{User.email}</div>
            </div>
            <div className="complete_wrapper">
                <div className="title">CREATE ACCOUNT</div>
                <div className="info">Finish setup your account to start using app</div>
                <div className="form">



                    <form id="createAccount" onSubmit={UpdateUser}>
                        <FormControl style={{alignSelf:'flex-start',minWidth:'200px'}} >
                            <InputLabel id="country_label">Country</InputLabel>
                            <Select labelId="country_label" id="country" name="country" label="country" onChange={handleCountry}>
                                {countryList?.map((c, i) => {
                                    return (
                                        <MenuItem value={c.id}><img style={{ padding: "0 5px" }} alt="country_flag" src={c.flag} width={20} height={20} /> {c.name}</MenuItem>
                                    )
                                })}

                            </Select>
                        </FormControl>
                        <FormControl fullWidth >
                            <TextField label="Bio" multiline rows={5} defaultValue={'Say about your self'} onChange={handleBio} />
                        </FormControl>
                        <FormControl fullWidth >
                            <InputLabel id="interestsLabel">Interests</InputLabel>
                            <Select
                                labelId="interestsLabel"
                                id="interests"
                                multiple
                                value={myInterests}
                                onChange={handleInterestChange}

                                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} />
                                        ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                            >
                                {interestsList.map((interest, index) => (
                                    <MenuItem
                                        key={index}
                                        value={interest.title}
                                      style={getStyle(interest.title, myInterests, theme)}
                                    >
                                        {interest.title}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth >
                            <InputLabel id="interestsLabel">Skills</InputLabel>
                            <Select
                                labelId="interestsLabel"
                                id="interests"
                                multiple
                                value={mySkills}
                                onChange={handleSkillsChange}

                                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} />
                                        ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                            >
                                {skillsList.map((skill, index) => (
                                    <MenuItem
                                        key={index}
                                        value={skill.title}
                                      style={getStyle(skill.title, mySkills, theme)}
                                    >
                                        {skill.title}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl style={{alignSelf:'flex-end'}}>
                            <Button variant='contained' color='primary' type='submit'>Create Account</Button>
                            
                        </FormControl>


                    </form>

                </div>
            </div>
        </div>
    )
}

export default ProfileComplete