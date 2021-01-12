import React from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import Checkbox from "@material-ui/core/Checkbox";
// @material-ui/pickers
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { Link } from "react-router-dom";

// @material-ui/icons
import VerifiedUserRounded from "@material-ui/icons/VerifiedUserSharp";
import InfoIcon from "@material-ui/icons/Info";
import TopicsIcon from "@material-ui/icons/PermDataSetting";
import CalendarIcon from "@material-ui/icons/DateRange";
import ProfileIcon from "@material-ui/icons/SupervisedUserCircle";
import Check from "@material-ui/icons/Check";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
// API Methods
import {
  getTweets,
  getUsers,
} from "../../API/TwitterAPI.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

const renderInformationCard = (classes) => {
  return (
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Información General</h4>
        <p className={classes.cardCategoryWhite}>
          Descripción de la herramienta e instrucciones de uso
        </p>
      </CardHeader>
      <CardBody>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <h5>Descripción de la herramienta</h5>
            <SnackbarContent
              message={
                "This is a notification with close button and icon and have many lines. You can see that the icon and the close button are always vertically aligned. This is a beautiful notification. So you don't have to worry about the style."
              }
              icon={InfoIcon}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <h5>Instrucciones de uso</h5>
            <SnackbarContent
              message={
                '1 - Millos tú papá'
              }
              color="info"
            />
          </GridItem>
        </GridContainer>
      </CardBody>
    </Card>
  );
}

const renderParameterSelector = (users, accounts, handleToggle, onChange, classes) => {
  return (
      <GridItem xs={12} sm={12} md={6}>
        <CustomTabs
          title="Parámetros del modelo:"
          headerColor="primary"
          tabs={[
            {
              tabName: "NO. DE TÓPICOS*",
              tabIcon: TopicsIcon,
              tabContent: (
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Número de tópicos"
                      id="number-of-topics"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        name: "topics",
                        type: "number",
                        onChange: onChange,
                      }}
                    />
                  </GridItem>
                </GridContainer>
              )
            },
            {
              tabName: "FECHAS",
              tabIcon: CalendarIcon,
              tabContent: (
                renderDatePickers(onChange)
              )
            },
            {
              tabName: "CUENTAS",
              tabIcon: ProfileIcon,
              tabContent: (
                <GridContainer>
                  {users.map((user) => (
                    createUserGrid(user, accounts, handleToggle, classes)
                  ))}
                </GridContainer>
              )
            },
          ]} 
        />
      </GridItem>
  );
}

const renderDatePickers = (handleDateChange) => {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="DD/MM/yyyy"
            margin="normal"
            id="date-picker-start"
            label="Fecha desde"
            value={new Date('2020-03-03T00:00:00')}
            minDate={new Date('2020-03-03T00:00:00')}
            maxDate={new Date()}
            onChange={(date, value) => handleDateChange(value, true)}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="DD/MM/yyyy"
            margin="normal"
            id="date-picker-end"
            label="Fecha hasta"
            value={new Date()}
            minDate={new Date('2020-03-03T00:00:00')}
            maxDate={new Date()}
            onChange={(date, value) => handleDateChange(value, false)}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </GridItem>
      </GridContainer>
    </MuiPickersUtilsProvider>
  );
}

const renderSelectedParameters = (parameters, classes) => {
  let topicsSection = <div></div>;
  if(parameters.topics) topicsSection = 
    <GridItem xs={12} sm={12} md={12}>
      <h5>Número de tópicos</h5>
      <SnackbarContent message={`Tópicos: ${parameters.topics}`} icon={InfoIcon}/>
    </GridItem>;
  
  let dateComponents = [];
  let dateSection = null;
  if(parameters.start) dateComponents.push(`Filtro fecha inicial: ${parameters.start}`);
  if(parameters.end) dateComponents.push(`Filtro fecha final: ${parameters.end}`);
  if(dateComponents.length) {
    dateSection = <ul>{dateComponents.map((message) => (<li key={message}>{message}</li>))}</ul>
  }

  let accountsSection = null;
  if(parameters.accounts) accountsSection = Object.keys(parameters.accounts).map(
    (account) => (parameters.accounts[account] ? 
      <SnackbarContent
        key={account}
        message={account}
        color="info"
        close
      /> : <div key={account}></div>))

  return (
    <GridItem xs={12} sm={12} md={6}>
      <Card>
        <CardHeader color="warning">
          <h4 className={classes.cardTitleWhite}>Parametros seleccionados</h4>
          <p className={classes.cardCategoryWhite}>
            Acá podrás ver los parámetros seleccionados para ejecutar el modelo
          </p>
        </CardHeader>
        <CardBody>
          <GridContainer>
            {topicsSection}
            {dateSection ? 
              <GridItem xs={12} sm={12} md={12}>
                <h5>Filtro de fechas</h5>
                <SnackbarContent message={dateSection} icon={InfoIcon}/>
              </GridItem> : ""}
            {accountsSection ? 
              <GridItem xs={12} sm={8} md={4}>
                <h5>Cuentas a analizar</h5>
                  {accountsSection}
              </GridItem> : ""}
          </GridContainer>
        </CardBody>
      </Card>
    </GridItem>
  );
}

const createUserGrid = (user, accounts, handleToggle, classes) => {
  return (
    <GridItem key={user.user_id} xs={12} sm={12} md={6}>
      <br />
      <Card>
        <CardAvatar profile>
          <img src={user.profile_image_url} alt="..." />
        </CardAvatar>
        <CardBody profile>
          <h4 className={classes.cardTitle}>{user.name}</h4>
          <p className={classes.cardCategory}>
            <span className={classes.infoText}>
              {user.verified ? <VerifiedUserRounded className={classes.upArrowCardCategory} /> : ""}
            </span>{" "}
            {`@${user.screen_name}`}
          </p>
        </CardBody>
        <CardFooter profile>
          <div className={classes.stats}>
            <Danger>
              <Checkbox
                checked={accounts[user.screen_name]}
                tabIndex={-1}
                onClick={() => handleToggle(user)}
                checkedIcon={<Check className={classes.checkedIcon} />}
                icon={<Check className={classes.uncheckedIcon} />}
                classes={{
                  checked: classes.checked,
                  root: classes.root
                }}
              />
            </Danger>
            Seleccionado para el modelo
          </div>
        </CardFooter>
      </Card>
    </GridItem>
  );
}

export default function Home(props) {
  const classes = useStyles();
  const [users, setUsers] = React.useState([]);
  const [parameters, setParameters] = React.useState({});

  const handleParameterChange = (event, isStart) => {
    if(event.target) {
      setParameters({
        ...parameters,
        [event.target.name]: event.target.value,
      });
    } else {
      setParameters({
        ...parameters,
        [isStart ? "start" : "end"]: event,
      })
    }
  };

  const handleToggle = (user) => {
    let accounts = parameters.accounts;
    accounts[user.screen_name] = !accounts[user.screen_name];
    setParameters({
      ...parameters,
      ["accounts"]: accounts,
    });
  };

  React.useEffect(() => {
    getUsers((data, err) => {
      if(!err) {
        let accounts = {};
        data.map((user) => {
          accounts[user.screen_name] = true
        });
        setParameters({accounts});
        setUsers(data);
      }
    });
  }, []);
  return (
    <div>
      {renderInformationCard(classes)}
      <GridContainer>
        {renderParameterSelector(users, parameters.accounts, handleToggle, handleParameterChange, classes)}
        {renderSelectedParameters(parameters, classes)}
      </GridContainer>
      {parameters.topics ? <div className="fixed-plugin">
        <Link to="/admin/dashboard">
          <Button
            round
            color="primary"
            onClick={() => props.executeModel(parameters)}
          >
            Ejecutar Modelo
          </Button>
        </Link>
      </div> : <div></div>}
      {/*<GridContainer>
        {users.map((user) => (
          createUserGrid(user, classes)
        ))}
        </GridContainer>*/}
    </div>
  );
}