import React from "react";
import moment from "moment";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/lab
import Skeleton from '@material-ui/lab/Skeleton';
// @material-ui/icons
import DateRange from "@material-ui/icons/DateRange";
import Accessibility from "@material-ui/icons/Accessibility";
import Twitter from '@material-ui/icons/Twitter'
import TopicsIcon from "@material-ui/icons/PermDataSetting";
import Info from "@material-ui/icons/InfoOutlined";
import Time from "@material-ui/icons/Schedule";
import Spellcheck from "@material-ui/icons/Spellcheck";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import GeneralInfo from './Sections/GeneralInfo/GeneralInfo.js';
import TopicInfo from './Sections/TopicInfo.js';
import TimeAnalysis from './Sections/TimeAnalysis/TimeAnalysis.js';
import TweetAnalysis from './Sections/TweetAnalysis.js';
import TopicWords from './Sections/TopicWords.js';

import { executeLDAModel } from "../../API/LDAModelAPI.js"

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Dashboard(props) {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(true);
  const [tweets, setTweets] = React.useState([]);
  const [modelInfo, setModelInfo] = React.useState({});
  const [dates, setDates] = React.useState({});
  const [colors, setColors] = React.useState({});
  const [pageCount, setPageCount] = React.useState(0);
  React.useEffect(() => {
    executeLDAModel(props.parameters, (data, err) => {
      if(!err && data.success) {
        console.log(data);
        setModelInfo(data.data.model_info);
        setTweets(data.data.tweets);
        setPageCount(Math.ceil(data.data.tweets.length/10));
        getDates(data.data.tweets);
        getColors(data.data.model_info);
      } else if (!err) {
        console.log(data.message);
      } else {
        console.log(err);
      }
      setLoading(false);
    });
  }, []);
  
  const getDates = (tweets) => {
    let datesObj = {};
    for(let tweet of tweets) {
      let date = moment(tweet.created_at.$date).startOf('day').format('DD MMM YYYY');
      let dateObj = datesObj[date];
      if(!dateObj) {
        let informationObject = {};
        informationObject["Tópico " + tweet.dominant_topic] = 1;
        informationObject["Total"] = 1;
        datesObj[date] = informationObject;
      } else {
        let topic = dateObj["Tópico " + tweet.dominant_topic];
        if(topic) {
          dateObj["Tópico " + tweet.dominant_topic] += 1;
        } else {
          dateObj["Tópico " + tweet.dominant_topic] = 1
        }
        dateObj["Total"] += 1;
      }
    }
    setDates(datesObj);
  };

  const getColors = (modelInfo) => {
    let colorsObj = {};
    for(let topic in modelInfo) {
      colorsObj["Tópico " + topic] = modelInfo[topic].color;
    }
    colorsObj["Ninguno"] = "#000";
    setColors(colorsObj);
  };

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Twitter />
              </CardIcon>
              {loading ? (
                <GridContainer>
                  <Skeleton style={styles.cardCategory} width="100%"/>
                  <Skeleton style={styles.cardTitle} width="100%"/>
                </GridContainer>
              ) : (
                <div>
                  <p className={classes.cardCategory}>Twits Analizados</p>
                  <h3 className={classes.cardTitle}>
                    {tweets.length}
                  </h3>
                </div>
              )}
            </CardHeader>
            <CardFooter stats>
              {loading ? (
                <Skeleton style={styles.stats} width="100%"/>
              ) : (
                <div className={classes.stats}>
                  {`Se analizaron ${tweets.length} twits al ejectar el modelo`}
                </div>
              )}
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <TopicsIcon />
              </CardIcon>
              {loading ? (
                <GridContainer>
                  <Skeleton style={styles.cardCategory} width="100%"/>
                  <Skeleton style={styles.cardTitle} width="100%"/>
                </GridContainer>
              ) : (
                <div>
                  <p className={classes.cardCategory}>Tópicos</p>
                  <h3 className={classes.cardTitle}>{props.parameters.topics}</h3>
                </div>
              )}
            </CardHeader>
            <CardFooter stats>
            {loading ? (
                <Skeleton style={styles.stats} width="100%"/>
              ) : (
                <div className={classes.stats}>
                  {`Se agruparon los twits en ${props.parameters.topics} tópicos`}
                </div>
              )}
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <DateRange />
              </CardIcon>
              {loading ? (
                <GridContainer>
                  <Skeleton style={styles.cardCategory} width="100%"/>
                  <Skeleton style={styles.cardTitle} width="100%"/>
                </GridContainer>
              ) : (
                <div>
                  <p className={classes.cardCategory}>Fechas</p>
                  <h5 className={classes.cardTitle}>{props.parameters.start ? moment(props.parameters.start).startOf("day").format('DD MMM YYYY') : "03 Mar 2020"}</h5>
                  <h5 className={classes.cardTitle}>{props.parameters.end ? moment(props.parameters.end).startOf("day").format('DD MMM YYYY') : moment().startOf('day').format('DD MMM YYYY')}</h5>
                </div>
              )}
            </CardHeader>
            <CardFooter stats>
            {loading ? (
                <Skeleton style={styles.stats} width="100%"/>
              ) : (
                <div className={classes.stats}>
                  {`Se analizaron twits de ${props.parameters.start ? moment(props.parameters.start).startOf("day").format('DD MMM YYYY') : "03 Mar 2020"} a ${props.parameters.end ? moment(props.parameters.end).startOf("day").format('DD MMM YYYY') : moment().startOf('day').format('DD MMM YYYY')}`}
                </div>
              )}
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Accessibility />
              </CardIcon>
              {loading ? (
                <GridContainer>
                  <Skeleton style={styles.cardCategory} width="100%"/>
                  <Skeleton style={styles.cardTitle} width="100%"/>
                </GridContainer>
              ) : (
                <div>
                  <p className={classes.cardCategory}>Cuentas</p>
                  <h3 className={classes.cardTitle}>{props.parameters.accounts.split(" ").length}</h3>
                </div>
              )}
            </CardHeader>
            <CardFooter stats>
            {loading ? (
                <Skeleton style={styles.stats} width="100%"/>
              ) : (
                <div className={classes.stats}>
                  {`Se analizaron los twits de ${props.parameters.accounts.split(" ").length} cuentas`}
                </div>
              )}
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info" icon stats>
              <CardIcon color="info">
                <Spellcheck />
              </CardIcon>
              <h3 className={classes.cardTitle}>
                Palabras más relevantes de cada tópico
              </h3>
            </CardHeader>
            <CardBody>
              <TopicWords 
                loading={loading} 
                modelInfo={modelInfo} 
                topics={props.parameters.topics}
              />
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <Info /> El tamaño de la palabra depende de su importancia en el tópico
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <CustomTabs
            title="Resultados:"
            headerColor="primary"
            tabs={[
              {
                tabName: "Información General",
                tabIcon: Info,
                tabContent: (
                  <GeneralInfo
                    topics={props.parameters.topics}
                    loading={loading}
                    tweets={tweets}
                    colors={colors}
                  />
                )
              },
              {
                tabName: "Tópicos",
                tabIcon: TopicsIcon,
                tabContent: (
                  <TopicInfo
                    topics={props.parameters.topics}
                    loading={loading}
                    modelInfo={modelInfo}
                    colors={colors}
                  />
                )
              },
              {
                tabName: "Análisis Temporal",
                tabIcon: Time,
                tabContent: (
                  <TimeAnalysis
                    tweets={tweets}
                    dates={dates}
                    loading={loading}
                    topics={props.parameters.topics}
                    colors={colors}
                  />
                )
              },
              {
                tabName: "Tweets",
                tabIcon: Twitter,
                tabContent: (
                  <TweetAnalysis
                    loading={loading}
                    tweets={tweets}
                    modelInfo={modelInfo}
                    colors={colors}
                    pageCount={pageCount}
                  />
                )
              }
            ]}
          />
        </GridItem>
      </GridContainer>
    </div>
  );
}
