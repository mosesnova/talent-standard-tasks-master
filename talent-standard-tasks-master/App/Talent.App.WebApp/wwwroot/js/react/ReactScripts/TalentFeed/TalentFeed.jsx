import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie'
import TalentCard from '../TalentFeed/TalentCard.jsx';
import { Loader } from 'semantic-ui-react';
import CompanyProfile from '../TalentFeed/CompanyProfile.jsx';
import FollowingSuggestion from '../TalentFeed/FollowingSuggestion.jsx';
import { BodyWrapper, loaderData } from '../Layout/BodyWrapper.jsx';
import { Player } from 'video-react';
import { Card, Icon, Image, Feed } from 'semantic-ui-react';



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
            companyDetails: null
        }

        this.init = this.init.bind(this);

    };

    init() {
        let loaderData = TalentUtil.deepCopy(this.state.loaderData)
        loaderData.isLoading = false;
        this.setState({ loaderData });//comment this
    }

    componentDidMount() {
        //window.addEventListener('scroll', this.handleScroll);
        this.init()
    };

   
    render() {
        return (
            <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
                <Card>
                    <Image src='/images/food-unsplash-thumbnail.jpg' wrapped ui={false} />
                    <Card.Content>
                        <Card.Header>Matthew</Card.Header>
                        <Card.Meta>
                            <span className='date'>Joined in 2015</span>
                        </Card.Meta>
                        <Card.Description>
                            Matthew is a musician living in Nashville.
      </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <a>
                            <Icon name='user' />
                            22 Friends
      </a>
                    </Card.Content>
                </Card>
                <Card>
                    <Card.Content>
                        <Card.Header>Recent Activity</Card.Header>
                    </Card.Content>
                    <Card.Content>
                        <Feed>
                            <Feed.Event>
                                <Feed.Label image='/images/avatar/small/jenny.jpg' />
                                <Feed.Content>
                                    <Feed.Date content='1 day ago' />
                                    <Feed.Summary>
                                        You added <a>Jenny Hess</a> to your <a>coworker</a> group.
            </Feed.Summary>
                                </Feed.Content>
                            </Feed.Event>

                            <Feed.Event>
                                <Feed.Label image='/images/avatar/small/molly.png' />
                                <Feed.Content>
                                    <Feed.Date content='3 days ago' />
                                    <Feed.Summary>
                                        You added <a>Molly Malone</a> as a friend.
            </Feed.Summary>
                                </Feed.Content>
                            </Feed.Event>

                            <Feed.Event>
                                <Feed.Label image='/images/avatar/small/elliot.jpg' />
                                <Feed.Content>
                                    <Feed.Date content='4 days ago' />
                                    <Feed.Summary>
                                        You added <a>Elliot Baker</a> to your <a>musicians</a> group.
            </Feed.Summary>
                                </Feed.Content>
                            </Feed.Event>
                        </Feed>
                    </Card.Content>
                </Card>
            <div className = "ui container" > Scroll Below to view the MP4 Player</div >
            <Player
                playsInline
                poster="/assets/poster.png"
                width="50%"
                height="50%"
                fluid="false"
                src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
            />
            </BodyWrapper>
        );
    }
}