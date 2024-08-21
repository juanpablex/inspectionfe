import './App.css'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Header from '../components/Header';
import PersonTypesList from "../Views/personTypes/PersonTypesList";
import PersonTypesDetail from "../Views/personTypes/PersonTypesDetail";
import PeopleList from '../Views/people/PeopleList';
import Sidebar from '../components/Sidebar';
import PersonTypesAdd from '../Views/personTypes/PersonTypesAdd';
import PersonTypesEdit from '../Views/personTypes/PersonTypesEdit';
import PeopleAdd from '../Views/people/PeopleAdd';
import PeopleEdit from '../Views/people/PeopleEdit';
import PeopleDetail from '../Views/people/PeopleDetail';
import BrandsAdd from '../Views/Brands/BrandsAdd';
import BrandsDetail from '../Views/Brands/BrandsDetail';
import BrandsEdit from '../Views/Brands/BrandsEdit';
import BrandsList from '../Views/Brands/BrandsList';
import ColorsAdd from '../Views/Colors/ColorsAdd';
import ColorsDetail from '../Views/Colors/ColorsDetail';
import ColorsEdit from '../Views/Colors/ColorsEdit';
import ColorsList from '../Views/Colors/ColorsList';
import ModelsAdd from '../Views/Models/ModelsAdd';
import ModelsDetail from '../Views/Models/ModelsDetail';
import ModelsEdit from '../Views/Models/ModelsEdit';
import ModelsList from '../Views/Models/ModelsList';
import ProductsAdd from '../Views/Products/ProductsAdd';
import ProductsDetail from '../Views/Products/ProductsDetail';
import ProductsEdit from '../Views/Products/ProductsEdit';
import ProductsList from '../Views/Products/ProductsList';
import PhonesAdd from '../Views/Phones/PhonesAdd';
import PhonesDetail from '../Views/Phones/PhonesDetails';
import PhonesEdit from '../Views/Phones/PhonesEdit';
import PhonesList from '../Views/Phones/PhonesList';
import PaymentMethodsAdd from '../Views/PaymentMethods/PaymentMethodsAdd';
import PaymentMethodsEdit from '../Views/PaymentMethods/PaymentMethodsEdit';
import PaymentMethodsList from '../Views/PaymentMethods/PaymentMethodsList';
import RangesAdd from '../Views/Ranges/RangesAdd';
import RangesDetail from '../Views/Ranges/RangesDetail';
import RangesEdit from '../Views/Ranges/RangesEdit';
import RangesList from '../Views/Ranges/RangesList';
import StatesAdd from '../Views/States/StatesAdd';
import StatesDetail from '../Views/States/StatesDetail';
import StatesEdit from '../Views/States/StatesEdit';
import StatesList from '../Views/States/StatesList';
import PaymentMethodsDetail from '../Views/PaymentMethods/PaymentMethodsDetail';
import ContractsList from '../Views/Contracts/ContractsList';
import ContractsAdd from '../Views/Contracts/ContractsAdd';
import ContractsEdit from '../Views/Contracts/ContractsEdit';
function App() {
  return(
    <BrowserRouter>
      <div className='container'>
        <Sidebar />
        <Header subtitle='INSPECCIÓN'/>
        <Routes>

        {/* <Route path="/" element={<PersonTypeModalParent/>}></Route> */}

          <Route path="/personTypes" element={<PersonTypesList/>}></Route>
          <Route path="/personTypes/add" element={<PersonTypesAdd/>}></Route>
          <Route path="/personTypes/edit/:id" element={<PersonTypesEdit/>}></Route>
          <Route path="/personTypes/:id" element={<PersonTypesDetail/>}></Route>

          <Route path="/people" element={<PeopleList/>}></Route>
          <Route path="/people/add" element={<PeopleAdd/>}></Route>
          <Route path="/people/edit/:id" element={<PeopleEdit/>}></Route>
          <Route path="/people/:id" element={<PeopleDetail/>}></Route>

          <Route path="/brands" element={<BrandsList/>}></Route>
          <Route path="/brands/add" element={<BrandsAdd/>}></Route>
          <Route path="/brands/edit/:id" element={<BrandsEdit/>}></Route>
          <Route path="/brands/:id" element={<BrandsDetail/>}></Route>

          <Route path="/models" element={<ModelsList/>}></Route>
          <Route path="/models/add" element={<ModelsAdd/>}></Route>
          <Route path="/models/edit/:id" element={<ModelsEdit/>}></Route>
          <Route path="/models/:id" element={<ModelsDetail/>}></Route>

          <Route path="/colors" element={<ColorsList/>}></Route>
          <Route path="/colors/add" element={<ColorsAdd/>}></Route>
          <Route path="/colors/edit/:id" element={<ColorsEdit/>}></Route>
          <Route path="/colors/:id" element={<ColorsDetail/>}></Route>

          <Route path="/products" element={<ProductsList/>}></Route>
          <Route path="/products/add" element={<ProductsAdd/>}></Route>
          <Route path="/products/edit/:id" element={<ProductsEdit/>}></Route>
          <Route path="/products/:id" element={<ProductsDetail/>}></Route>

          <Route path="/phones" element={<PhonesList/>}></Route>
          <Route path="/phones/add" element={<PhonesAdd/>}></Route>
          <Route path="/phones/edit/:id" element={<PhonesEdit/>}></Route>
          <Route path="/phones/:id" element={<PhonesDetail/>}></Route>

          <Route path="/states" element={<StatesList/>}></Route>
          <Route path="/states/add" element={<StatesAdd/>}></Route>
          <Route path="/states/edit/:id" element={<StatesEdit/>}></Route>
          <Route path="/states/:id" element={<StatesDetail/>}></Route>

          <Route path="/ranges" element={<RangesList/>}></Route>
          <Route path="/ranges/add" element={<RangesAdd/>}></Route>
          <Route path="/ranges/edit/:id" element={<RangesEdit/>}></Route>
          <Route path="/ranges/:id" element={<RangesDetail/>}></Route>

          <Route path="/paymentMethods" element={<PaymentMethodsList/>}></Route>
          <Route path="/paymentMethods/add" element={<PaymentMethodsAdd/>}></Route>
          <Route path="/paymentMethods/edit/:id" element={<PaymentMethodsEdit/>}></Route>
          <Route path="/paymentMethods/:id" element={<PaymentMethodsDetail/>}></Route>

          <Route path="/contracts" element={<ContractsList/>}></Route>
          <Route path="/contracts/add" element={<ContractsAdd/>}></Route>
          <Route path="/contracts/edit/:id" element={<ContractsEdit/>}></Route>
          {/* <Route path="/contracts/:id" element={<ContractsDetail/>}></Route> */}

        </Routes>
      </div>
    </BrowserRouter>
  );


  // const [count, setCount] = useState(0)

  // return (
  //   <>
  //     <div>
  //       <a href="https://vitejs.dev" target="_blank">
  //         <img src={viteLogo} className="logo" alt="Vite logo" />
  //       </a>
  //       <a href="https://react.dev" target="_blank">
  //         <img src={reactLogo} className="logo react" alt="React logo" />
  //       </a>
  //     </div>
  //     <h1>Vite + React</h1>
  //     <div className="card">
  //       <button onClick={() => setCount((count) => count + 1)}>
  //         count is {count}
  //       </button>
  //       <p>
  //         Edit <code>src/App.tsx</code> and save to test HMR
  //       </p>
  //     </div>
  //     <p className="read-the-docs">
  //       Click on the Vite and React logos to learn more
  //     </p>
  //   </>
  // )

}

export default App
