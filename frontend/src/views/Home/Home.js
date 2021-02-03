import React from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from '@material-ui/core/Chip';
import Radio from '@material-ui/core/Radio';
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
import At from "@material-ui/icons/AlternateEmailSharp";
import Spellcheck from "@material-ui/icons/Spellcheck";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
// API Methods
import { getUsers } from "../../API/TwitterAPI.js";

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
              message={(
                <p>
                  Esta herramienta fue desarrollada con el fin de proporcionar a la Universidad de Los Andes, un mecanismo mediante el cual le sea posible analizar grande volúmenes de tuits vinculados a la universidad. Dado que Twitter es una fuente con grandes volúmenes de datos, presentes en una plataforma digital desvinculada a la universidad, se pensó que podría complementar los datos ya existentes de la misma, de manera que facilite el proceso de toma de decisiones.
                  <br />
                  <br />
                  La herramienta utiliza la metodología de Modelado de Tópicos, mediante la cual se pueden agrupar los tuits en diferentes tópicos, de acuerdo con su contenido. Esta herramienta en particular utiliza el algoritmo LDA (Latent Dirichlet Allocation) para realizar la agrupación de tuits en tópicos.
                  <br />
                  <br />
                  Se tiene una base de datos en donde se almacenan los tuits relevantes para realizar el modelado de tópicos. Se tiene un proceso que carga los tuits de unas cuentas predefinidas y adicionalmente, cada día a media noche, se cargan los tuits de esas cuentas.
                  <br />
                  <br />
                  El texto de cada tuit es procesado (tokenizado y lematizado) de manera que pueda ser utilizado por el modelo LDA. La tokenización implica generar una lista de palabras de cada tuit y la lematización implica encontrar la forma más simple de cada de palabra (por ejemplo, en vez de tener la palabra daremos, se tiene la palabra dar). Adicionalmente, se remueven los caracteres especiales (puntuación, emojis, etc.) y los conectores o stopwords.
                  <br />
                  <br />
                  Los tuits se pueden filtrar por fecha, cuenta, palabras clave y se puede seleccionar si el modelo se ejecuta sobre el texto, sobre los hashtags o sobre ambos. La fecha mínima es el 03 de marzo de 2020 (fecha en la que se reportó el primer caso de Covid-19 en Colombia).Luego de que el modelo es ejecutado, es posible observar en el dashboard los resultados del modelo:
                  <br />
                  <ul>
                    <li>Palabras más relevantes de cada tópico.</li>
                    <li>Conteo de palabras por tuit (en total y por tópico).</li>
                    <li>Importancia de cada palabra dentro de un tópico y la cantidad de veces que esa palabra aparece.</li>
                    <li>Cantidad de tuits que pertenecen a cada tópico.</li>
                    <li>Evolución de cada tópico en el tiempo.</li>
                    <li>Relevancia de cada tópico en el tiempo.</li>
                    <li>Relevancia de cada tópico por cuenta</li>
                    <li>Token lematizado de cada tuit y la distribución del tuit en los diferentes tópicos.</li>
                  </ul>
                  Para ejecutar la herramienta es necesario especificar la cantidad de tópicos en los cuales se agruparán los tuits. Los otros parámetros son opcionales. En el costado izquierdo, se pueden observar las instrucciones para utilizar la herramienta.
                </p>
              )}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <h5>Instrucciones de uso</h5>
            <SnackbarContent
              message={(
                <ol>
                  <li>Slecciona el número de tópicos en los cuales deseas agrupar los tuits.</li><br/>
                  <li>En la siguientes pestañas podrás encontrar otros filtros para los tuits.</li><br/>
                  <li>En la pestaña de fechas: Selecciona el rango de fechas en del cual deseas analizar los tuits. Por defecto, la fecha mínima es el 03 de marzo de 2020 y la fecha máxima es hoy.</li><br/>
                  <li>En la pestaña de cuentas: Selecciona las cuentas las cuales deseas analizar tuits. Por defecto, todas están seleccionadas.</li><br/>
                  <li>En la pestaña de palabras clave: Escribe las palabras clave, las cuales serán utilizadas para filtrar los tuits. Cada vez que espiches la tecla espacio se agregará una nueva palabra.</li><br/>
                  <li>Al costado izquierdo de la selección de parámetros, podras observar los parámetros que has seleccionado.</li><br/>
                  <li>Selecciona sobre qué datos deseas hacer el análisis. Puedes ejecutar el modelo con base en el texto de los tuits, con base en los hashtags o con base en ambos.</li><br/>
                  <li>Al ingresar el número de tópicos, se habilitará un botón para ejecutar el modelo. Dale click una vez hayas seleccionado todos los parámetros.</li><br/>
                  <li>Al darle click al botón, la herramienta te redirigirá hacía el dashboard, donde podrás observar los resultados del modelo.</li><br/>
                </ol>
              )}
            />
          </GridItem>
        </GridContainer>
      </CardBody>
    </Card>
  );
};

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
            {
              tabName: "PALABRAS CLAVE",
              tabIcon: Spellcheck,
              tabContent: (
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Agregar palabra clave"
                      id="keywords"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        name: "keywords",
                        type: "text",
                        onChange: onChange,
                      }}
                    />
                  </GridItem>
                </GridContainer>
              )
            },
          ]} 
        />
      </GridItem>
  );
};

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
};

const renderSelectedParameters = (parameters, classes, handleDelete, handleChange) => {
  let topicsSection = <div></div>;
  if(parameters.topics) topicsSection = 
    <GridItem xs={12} sm={12} md={12}>
      <h5>Número de tópicos</h5>
      <SnackbarContent 
        message={(<Chip label={`Tópicos: ${parameters.topics}`} color="primary" onDelete={() => handleDelete("topics", null)}/>)} 
        icon={TopicsIcon}
      />
    </GridItem>;
  
  let dateComponents = [];
  let dateKeys = [];
  let dateSection = null;
  if(parameters.start) {
    dateComponents.push(`Filtro fecha inicial: ${parameters.start}`);
    dateKeys.push("start");
  }
  if(parameters.end) {
    dateComponents.push(`Filtro fecha final: ${parameters.end}`);
    dateKeys.push("end");
  }
  if(dateComponents.length) {
    dateSection = <ul>{dateComponents.map((message, i) => (<Chip key={message} color="primary" label={message} onDelete={() => handleDelete(dateKeys[i], null)} />))}</ul>
  }

  let accountsSection = null;
  if(parameters.accounts) accountsSection = Object.keys(parameters.accounts).map(
    (account) => (parameters.accounts[account] ? 
      (
        <GridItem key={account} xs={12} sm={6} md={3}>
          <Chip
            icon={<At />}
            color="primary"
            label={account}
            onDelete={() => handleDelete("accounts", account)}
          />
        </GridItem>
      ) : (
      <div key={account}></div>
      )
    ));

  let keywordsSection = null;
  if(parameters.keywords) keywordsSection = parameters.keywords.split(" ").map((word) => (
    <GridItem key={word} xs={12} sm={6} md={3}>
      <Chip
        icon={<Spellcheck />}
        color="primary"
        label={word}
        onDelete={() => handleDelete("keywords", word)}
      />
    </GridItem>
  ));

  return (
    <GridItem xs={12} sm={12} md={6}>
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Parametros seleccionados</h4>
          <p className={classes.cardCategoryWhite}>
            Acá podrás ver los parámetros seleccionados para ejecutar el modelo
          </p>
        </CardHeader>
        <CardBody>
            {topicsSection}
            {dateSection ? 
              <GridItem xs={12} sm={12} md={12}>
                <h5>Filtro de fechas</h5>
                <SnackbarContent message={dateSection} icon={CalendarIcon}/>
              </GridItem> : ""}

            {accountsSection ?
            <div>
              <h5>Cuentas Seleccionadas</h5>
              <GridContainer>
                {accountsSection}
              </GridContainer> 
            </div>: ""}
            {keywordsSection ?
            <div>
              <h5>Palabras clave</h5>
              <GridContainer>
                {keywordsSection}
              </GridContainer> 
            </div>: ""}
            <GridItem xs={12} sm={12} md={12}>
              <h5>Selecciona los datos del modelo</h5>
             <Radio
              color="primary"
              checked={!parameters["hashtagmodel"] || parameters["hashtagmodel"] === "0"}
              onChange={handleChange}
              value="0"
              name="hashtagmodel"
            /> Modelo sobre los Twits
            <br />
            <Radio
              color="primary"
              checked={parameters['hashtagmodel'] === "1"}
              onChange={handleChange}
              value="1"
              name="hashtagmodel"
            /> Modelo sobre los hashtags (#)
            <br />
            <Radio
              color="primary"
              checked={parameters['hashtagmodel'] === "2"}
              onChange={handleChange}
              value="2"
              name="hashtagmodel"
            /> Modelo sobre ambos
            </GridItem>
        </CardBody>
      </Card>
    </GridItem>
  );
};

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
          <div >
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
            Seleccionado
          </div>
        </CardFooter>
      </Card>
    </GridItem>
  );
};

const validParameters = (parameters) => {
  console.log(parameters);
  let topicsNumber = Number(parameters.topics);
  if(!topicsNumber || topicsNumber < 1) return false;
  if(parameters.hashtagmodel && !(parameters.hashtagmodel === "2" || parameters.hashtagmodel === "1" || parameters.hashtagmodel === "0")) return false;
  if(Object.keys(parameters.accounts).filter(account => parameters.accounts[account]).length === 0) return false;
  return true;
};

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

  const handleDelete = (parameter, value) => {
    if(parameter === "accounts") {
      let accounts = parameters["accounts"];
        accounts[value] = false
        setParameters({
          ...parameters,
          ["accounts"]: accounts,
        });
    } else if (parameter === "keywords") {
      let keywords = parameters["keywords"];
      keywords = keywords.replace(value, "");
      keywords = keywords.trim();
      setParameters({
        ...parameters,
        ["keywords"]: keywords,
      })
    } else {
      setParameters({
        ...parameters,
        [parameter]: null,
      });
    }        
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
        {renderSelectedParameters(parameters, classes, handleDelete, handleParameterChange)}
      </GridContainer>
      {validParameters(parameters) ? (
      <div className="fixed-plugin">
        <Link to="/admin/dashboard">
          <Button
            round
            color="primary"
            onClick={() => props.executeModel(parameters)}
          >
            Ejecutar Modelo
          </Button>
        </Link>
      </div>
      ) : (
      <div></div>
      )}
    </div>
  );
}