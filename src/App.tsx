// src/App.jsx
import { Admin, Resource,ListGuesser } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { EmployeeList } from "./employees/EmployeeList";
import { EmployeeCreate } from "./employees/EmployeeCreate";
import { EmployeeEdit } from "./employees/EmployeeEdit";
import { EmployeeShow } from "./employees/EmployeeShow";
import {InternsList} from "./Interns/InternsList"
import {InternCreate} from "./Interns/InternCreate"
import { InternEdit } from "./Interns/InternEdit";

const dataProvider = jsonServerProvider("http://localhost:3002");

export const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource
      name="employees"
      list={EmployeeList}
      recordRepresentation={(record)=>`${record.firstname}${" "}${record.lastname}`}
      create={EmployeeCreate}
      edit={EmployeeEdit}
      show={EmployeeShow}
    />
     <Resource
      name="Interns"
      list={InternsList}
      create={InternCreate}
      edit={InternEdit}
    />
  </Admin>
);
