import React from 'react';
import Cookies from 'js-cookie';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { FormErrors } from '../Form/FormErrors.jsx';
import FormItemWrapper from '../Form/FormItemWrapper.jsx';
import { Name } from './Name.jsx';
import { Description } from './Description.jsx';
import { Toggle } from './Toggle.jsx';
import AuthenticatingBanner from '../Layout/Banner/AuthenticatingBanner.jsx';
import { LoggedInNavigation } from '../Layout/LoggedInNavigation.jsx';
import { IndividualDetailSection, CompanyDetailSection } from './ContactDetail.jsx';
import { BodyWrapper, loaderData } from '../Layout/BodyWrapper.jsx';
import { Dropdown, Button } from 'semantic-ui-react';
import Lightbox from 'react-images';
import { LinkedAccountsComponent } from './LinkedAccountsComponent.jsx';
import { Location } from '../Employer/CreateJob/Location.jsx';
import Select from 'react-select';
import $ from 'jquery';



export default class EmployeeProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employerData: {
            },
            formErrors: { name: '', email: '' },
            nameValid: false,
            emailValid: false,
            formValid: true,
            loaderData: loaderData,
            students: [
                { id: 1, name: 'Arabic', age: 21, email: 'Basic' },
                { id: 2, name: 'Hindi', age: 19, email: 'Basic' },
                { id: 3, name: 'Maori', age: 16, email: 'Basic' },
                { id: 4, name: 'German', age: 25, email: 'Basic' }
            ],
            skills: [
                { sid: 1, sname: 'C',  slevel: 'Basic' },
                { sid: 2, sname: 'C#', slevel: 'Profecient' },
                { sid: 3, sname: 'MVC',slevel: 'Basic' }
            ],
            workexperiences: [
                { id: 1, company: 'Company1', position: 'Software Developer', responsibilities:'coding', start:'1/1/2010',end:'1/1/2010' },
                { id: 2, company: 'Company2', position: 'Software Developer', responsibilities: 'coding', start: '1/1/2010', end: '1/1/2010'  },
                { id: 3, company: 'Company3', position: 'Software Developer', responsibilities: 'coding', start: '1/1/2010', end: '1/1/2010'  }
            ],
            studentnew: [
                { id: null, name: null, age: null, email: null }
            ],
            skillnew: [
                {sid:null, sname:null, slevel:null}
            ],
            selectedFile: null,
            imageName: '',
            id: '',
            name: '',
            age: '',
            email: '',
            sid:'',
            sname: '',
            slevel: '',
            languages:[]
        };

        this.loadData = this.loadData.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);
        this.validateField = this.validateField.bind(this);
        this.errorClass = this.errorClass.bind(this);
        this.isFormValid = this.isFormValid.bind(this);
        this.updateForComponentId = this.updateForComponentId.bind(this);
        this.updateWithoutSave = this.updateWithoutSave.bind(this);
        this.updateAndSaveData = this.updateAndSaveData.bind(this);
        this.saveData = this.saveData.bind(this);
        this.init = this.init.bind(this);
        this.AddLanguage = this.AddLanguage.bind(this);
        this.logChange = this.logChange.bind(this);
        this.fileChangedHandler = this.fileChangedHandler.bind(this);
        this.uploadHandler = this.uploadHandler.bind(this);
        this.handleChangeId = this.handleChangeId.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeAge = this.handleChangeAge.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeSname = this.handleChangeSname.bind(this);
        this.handleChangeSid = this.handleChangeSid.bind(this);
        this.handleChangeSlevel = this.handleChangeSlevel.bind(this);
        this.AddSkill = this.AddSkill.bind(this);
       
    };

    init() {
        let loaderData = this.state.loaderData;
        loaderData.allowedUsers.push("Employer");
        loaderData.allowedUsers.push("Recruiter");
        loaderData.isLoading = false;
        this.setState({ loaderData, })
    }

    componentDidMount() {
        this.loadData();
    }
    logChange(e) {
        this.setState({
            value: e.target.value
        });
        console.log(this.state.value);

    }
    renderTableData() {
        return this.state.students.map((student, index) => {
            const { id, name, age, email } = student; //destructuring
            return (
                <tr key={id}>
                    <td><input value={id} onChange={this.logChange} type="text" /></td>
                    <td><input defaultValue={name} onChange={this.logChange} type="text" /></td>
                    <td>{age}</td>
                    <td>{email}</td>
                    <td><Button>Edit</Button></td>
                    <td><Button>Delete</Button></td>
                </tr>
            );
        });
    }
    renderSkillTableData() {
        return this.state.skills.map((skill, index) => {
            const { sid, sname, slevel } = skill; //destructuring
            return (
                <tr key={sid}>
                    <td><input value={sid} onChange={this.logChange} type="text" /></td>
                    <td><input defaultValue={sname} onChange={this.logChange} type="text" /></td>
                    <td>{slevel}</td>
                    <td><Button>Edit</Button></td>
                    <td><Button>Delete</Button></td>
                </tr>
            );
        });
    }
    renderWorkExperienceTableData() {
        return this.state.workexperiences.map((workexperience, index) => {
            const { id, company, position,responsibilities,start,end } = workexperience; //destructuring
            return (
                <tr key={id}>
                    <td><input value={id} onChange={this.logChange} type="text" /></td>
                    <td><input defaultValue={company} onChange={this.logChange} type="text" /></td>
                    <td><input defaultValue={position} onChange={this.logChange} type="text" /></td>
                    <td><input defaultValue={responsibilities} onChange={this.logChange} type="text" /></td>
                    <td><input defaultValue={start} onChange={this.logChange} type="text" /></td>
                    <td><input defaultValue={end} onChange={this.logChange} type="text" /></td>
                    <td><Button>Edit</Button></td>
                    <td><Button>Delete</Button></td>
                </tr>
            );
        });
    }
    fileChangedHandler(event)  {
        this.setState({ selectedFile: event.target.files[0] });
        
    }
    uploadHandler(event) {
        event.preventDefault();
        var img = this.state.selectedFile.name;
        this.setState({ imageName: '/images/avatar/small/elliot.jpg' });
        console.log(this.state.selectedFile.name);
    }
    loadData() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/getEmployerProfile',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                let employerData = null;
                if (res.employer) {
                    employerData = res.employer
                    //console.log("employerData", employerData)
                }
                this.updateWithoutSave(employerData)
            }.bind(this),
            error: function (res) {
                console.log(res.status)
            }
        }) 
        this.init()
    }

    updateForComponentId(componentId, newValues) {
        console.log("ehh");
        let data = {};
        data[componentId] = newValues;
        this.updateAndSaveData(data)
    }

    //updates component's state without saving data
    updateWithoutSave(newData) {
        let newSD = Object.assign({}, this.state.employerData, newData)
        this.setState({
            employerData: newSD
        })
    }

    //updates component's state and saves data
    updateAndSaveData(newData) {
        let newSD = Object.assign({}, this.state.employerData, newData)
        this.setState({
            employerData: newSD
        }, this.saveData)
    }

    handleUserInput(event) {

        const name = event.target.name;
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        if (event.target.type === 'checkbox') {
            this.setState({
                [name]: value
            })
        }
        else {
            this.setState({
                [name]: value
            }, () => { this.validateField(name, value) })
        }
    };

    validateField(fieldName, value) {
        //debugger
        //console.log("validateField!")
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let nameValid = this.state.nameValid;
        var formValid = this.state.formValid;
        switch (fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                formValid = emailValid != null;
                break;
            case 'name':
                nameValid = value.match('\w');
                fieldValidationErrors.nameValid = nameValid ? '' : ' is invalid';
                formValid = nameValid;
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            emailValid: emailValid,
            nameValid: nameValid,
            formValid: formValid
        }, this.validateForm);
    }

    errorClass(error) {
        return (error.length === 0 ? false : true);
    }

    isFormValid() {
        return this.state.formValid == false ? 'error' : '';
    }
    handleChangeSname(event) {
        let { skillnew } = this.state;
        this.setState({ sname: event.target.value });
        skillnew[0].sname = event.target.value;
    }
    handleChangeSlevel(event) {
        console.log("DropDown");
        console.log(event.target.value);
        let { skillnew } = this.state;
        this.setState({ slevel: event.target.value });
        skillnew[0].slevel = event.target.value;
        console.log(skillnew[0].slevel);
    }
    handleChangeSid(event) {
        let { skillnew } = this.state;
        this.setState({ sid: event.target.value });
        skillnew[0].sid = event.target.value;
    }

    handleChangeId(event) {
        let { studentnew } = this.state;
        this.setState({ id: event.target.value });
        studentnew[0].id = event.target.value;
    }

    handleChangeName(event) {
        let { studentnew } = this.state;
        this.setState({ name: event.target.value });
        studentnew[0].name = event.target.value;
    }
    handleChangeAge(event) {
        let { studentnew } = this.state;
        this.setState({ age: event.target.value });
        studentnew[0].age = event.target.value;
    }
    handleChangeEmail(event) {
        let {studentnew } = this.state;
        this.setState({ email: event.target.value });
        studentnew[0].email = event.target.value;
    }
    onChangelanguage(event) {
        alert("Clicked");
    }
    AddLanguage(event) {
        // this.event.preventDefault();
        event.preventDefault();
        //alert("Added to Array");
        //// event.target.name = event.target.value;
        ////studentnew: Object.assign(id: this.state.id, name: this.state.name, age: this.state.age, email: this.state.email);

        //console.log(this.state.studentnew);
        //let { students, studentnew } = this.state;
        //students.push(studentnew[0]);
        
        //this.setState({
        //    students
        //});
        //console.log(this.state.students);
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/getLanguage',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            success: function (languages) {
                console.log(languages);
                this.setState({ languages: languages });
                console.log(this.state.languages);
                function languageName(value, label) {
                    this.value = value;
                    this.label = label;
                }
                var lArray = [];
                let languageArrays = this.state.languages;
                console.log("lArray",languageArrays);
                if (languageArrays) {
                    $.each(languageArrays, function (inde, language) {
                        $.each(language, function (i, value) {
                            lArray.push(new languageName(value.language, value.language));
                        });
                    });
                    console.log("New Array", languageName);
                    this.setState({ languages: lArray });
                }
            }.bind(this)
        });


    }

    AddSkill(event) {
        event.preventDefault();
        alert("Added to Array");
        console.log(this.state.skillnew);
        let { skills, skillnew } = this.state;
        skills.push(skillnew[0]);

        this.setState({
            skills
        });
        console.log(this.state.skills);
    }


    saveData() {

        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/saveEmployerProfile',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(this.state.employerData),
            success: function (res) {
                if (res.success) {
                    TalentUtil.notification.show("Employer details saved successfully", "success", null, null);
                }
                else {
                    TalentUtil.notification.show("Error while saving Employer details", "error", null, null);
                }
            }.bind(this),
            error: function (res) {
                TalentUtil.notification.show("Error while saving Employer details", "error", null, null);
            }.bind(this)
        });
    }

    render() {
        const Options = [
            {
                key: 'Kiwi',
                text: 'Kiwi',
                value: 'Kiwi',
                image: { avatar: true, src: '/images/avatar/small/jenny.jpg' }
            },
            {
                key: 'Chinese',
                text: 'Chinese',
                value: 'Chinese',
                image: { avatar: true, src: '/images/avatar/small/elliot.jpg' }

            }];
        const OptionsProfeciency = [
            {
                label: 'Basic',
                value: 'Basic'
                
            },
            {
                
                label: 'Intermediate',
                value: 'Intermediate'
            },
            {
                
                label: 'Expert',
                value: 'Expert'
            }
        ];
        return (
            <BodyWrapper loaderData={this.state.loaderData} reload={this.loadData}>
                <section className="page-body">
                    <div className="ui container">
                        <div className="ui container">
                            <div className="profile">
                                <form className="ui form">
                                    <div className="ui grid">
                                        <FormItemWrapper
                                            title='Primary Contact Details'
                                            tooltip='Enter your primary contact details'
                                        >
                                            <IndividualDetailSection
                                                controlFunc={this.updateForComponentId}
                                                details={this.state.employerData.primaryContact}
                                                componentId='primaryContact'
                                            />
                                        </FormItemWrapper>

                                        <FormItemWrapper
                                            title='Company Contact Details'
                                            tooltip='Enter your company contact details'
                                        >
                                            <CompanyDetailSection
                                                controlFunc={this.updateForComponentId}
                                                details={this.state.employerData.companyContact}
                                                componentId='companyContact'
                                            />
                                        </FormItemWrapper>
                                     
                                        <FormItemWrapper
                                            title='Display profile'
                                            tooltip='Toggle company profile visibility in the employer feed.'
                                            hideSegment={true}
                                            
                                        >
                                            <Toggle
                                                updateStateData={this.updateWithoutSave}
                                                displayProfile={this.state.employerData.displayProfile}
                                            />Nationality :
                                            <Dropdown
                                                placeholder='select'
                                                fluid
                                                selection
                                                options={Options}
                                            />
                                            Location:
                                            <Location location={location} handleChange={this.handleChange} />
                                            id:<input onChange={this.handleChangeId} value={this.state.id} />
                                            language:<Select onChange={this.onChangelanguage} options={this.state.languages}/>
                                            age:<input onChange={this.handleChangeAge} value={this.state.age} />
                                            email:<input onChange={this.handleChangeEmail} value={this.state.email} />
                                           
                                            <Button className="ui button" onClick={this.AddLanguage}>Add New</Button>
                                            <div>
                                                <h1 id='title'>Language Component</h1>
                                                <table id='students'>
                                                    <tbody>
                                                        {this.renderTableData()}
                                                    </tbody>
                                                </table>
                                            </div>
                                            Profile Photo:
                                            <img src="http://www.croop.cl/UI/twitter/images/doug.jpg"  alt="logo" />
                                           
                                           <button onClick={this.uploadHandler}>Upload!</button>
                                        </FormItemWrapper>

                                        <FormItemWrapper
                                            title='Linked Account Details'
                                            tooltip='Enter your linked details'
                                        >
                                            <LinkedAccountsComponent
                                                controlFunc={this.updateForComponentId}
                                                details={this.state.employerData.primaryContact}
                                                componentId='LinkedComponent'
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Skill Component'
                                            tooltip='Enter your linked details'
                                        >
                                            <Button className="ui button" onClick={this.AddSkill}>Add New Skill</Button>
                                            <div>
                                                <h1 id='title'>Skill Component</h1>
                                                Id:<input value={this.state.sid} onChange={this.handleChangeSid} />
                                                Skill: <input value={this.state.sname} onChange={this.handleChangeSname} />
                                                Profeciency:
                                                <Select options={OptionsProfeciency} onChange={this.handleChangeSlevel} defaultValue={{ label: this.state.skillnew[0].slevel, value: this.state.skillnew[0].slevel }} />
                                                <table id='students'>
                                                    <tbody>
                                                        {this.renderSkillTableData()}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Work Experience Component'
                                            tooltip='Enter your linked details'
                                        >
                                            <Button className="ui button" onClick={this.AddLanguage}>Add New Skill</Button>
                                            <div>
                                                <h1 id='title'>Work Experience Component</h1>
                                                <table id='students'>
                                                    <tbody>
                                                        {this.renderWorkExperienceTableData()}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Visa Status'
                                            tooltip='Enter your linked details'
                                        >
                                            <Dropdown
                                                placeholder='select'
                                                fluid
                                                selection
                                                options={Options}
                                            />
                                        </FormItemWrapper>
                                        <div className="sixteen wide column">
                                            <div>
                                                <input type="button" className="ui button right floated" onClick={() => window.history.go(-1)} value="Cancel"></input>
                                                <input type="button" className="ui teal button right floated" onClick={this.saveData} value="Save"></input>
                                            </div>
                                        </div >
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </BodyWrapper>
        )
    }
}
