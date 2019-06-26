import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import TalentCard from '../TalentFeed/TalentCard.jsx';
import { Loader } from 'semantic-ui-react';
import CompanyProfile from '../TalentFeed/CompanyProfile.jsx';
import FollowingSuggestion from '../TalentFeed/FollowingSuggestion.jsx';
import { BodyWrapper, loaderData } from '../Layout/BodyWrapper.jsx';
import { Player } from 'video-react';
import { Card, Icon, Image, Feed } from 'semantic-ui-react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



export default class TalentFeed extends React.Component {
    constructor(props) {
        super(props);

        let loader = loaderData
        loader.allowedUsers.push("Employer")
        loader.allowedUsers.push("Recruiter")

        this.state = {
            loadNumber: 5,
            loadPosition: 0,
            feedData: [],
            watchlist: [],
            loaderData: loader,
            loadingFeedData: false,
            companyDetails: null,
            Id: '',
            FirstName:''
        }

        this.init = this.init.bind(this);
        this.loadData = this.loadData.bind(this);

    };

    init() {
        let loaderData = TalentUtil.deepCopy(this.state.loaderData)
        loaderData.isLoading = false;
        this.setState({ loaderData });//comment this
    }

    componentDidMount() {
        //window.addEventListener('scroll', this.handleScroll);
        this.init();
        this.loadData();
    }

    loadData() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/getTalentProfile',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            success: function (res) {
                console.log(res);
                this.setState({ Id: res.data.id, FirstName: res.data.firstName });
            }.bind(this)
        });
        this.init();
    }
   
    render() {
        return (
            <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
                <div className="ui grid">
                    <div className="three wide column"><Col><Card>
                        
                        <Card.Content>
                            <Card.Header>MVP Studio</Card.Header>
                            <Card.Meta>
                                <span className='date'>Auckland, New Zealand</span>
                            </Card.Meta>
                            <Card.Description>
                                {this.state.FirstName}  We currently do not have specific skills that we deserve.
      </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <a>
                                <Icon name='user' />
                                22 Friends
      </a>
                        </Card.Content>
                    </Card></Col></div>
                    <div className="three wide column"><Col><Card>
                        <Image src='/images/food-unsplash-thumbnail.jpg' wrapped ui={false} />
                        <Card.Content>
                            <Card.Header>Moses</Card.Header>
                            <Card.Meta>
                                <span className='date'>Talent Snapshot</span>
                            </Card.Meta>
                            <Card.Description>
                                {this.state.FirstName} 
                            </Card.Description>
                            <Card.Meta>
                                <span className='date'>Visa Status</span>
                            </Card.Meta>
                            <Card.Description>
                                Current
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <a>
                                <Icon name='user' />
                                22 Friends
      </a>
                        </Card.Content>
                    </Card></Col></div>
                    <div className="three wide column"><Col><Card>
                        <Card.Content>
                            <Card.Header>Follow Talent</Card.Header>
                        </Card.Content>
                        <Card.Content>
                            <Feed>
                                <Feed.Event>
                                    <Feed.Label image='/images/avatar/small/jenny.jpg' />
                                    <Feed.Content>
                                        <Feed.Date content='1 day ago' />
                                        <Feed.Summary>
                                            You added <a>Moses Nova</a> to your <a>coworker</a> group.
            </Feed.Summary>
                                    </Feed.Content>
                                </Feed.Event>

                                

                                <Feed.Event>
                                    <Feed.Label image='/images/avatar/small/elliot.jpg' />
                                    <Feed.Content>
                                        <Feed.Date content='4 days ago' />
                                        <Feed.Summary>
                                            You added <a>Naomi Nova</a> to your <a>musicians</a> group.
            </Feed.Summary>
                                    </Feed.Content>
                                </Feed.Event>
                            </Feed>
                        </Card.Content>
                    </Card></Col></div>
                </div>
            </BodyWrapper>
        );
    }
}