import { useState,useEffect } from "react";
import CarService from "../services/CarService";
import BarChart from "./BarChart";
import Select from 'react-select';
import OrderService from "../services/OrderService";
import { Footer } from "./Footer";
import { Line, Pie } from "react-chartjs-2";
import FullOrderService from "../services/FullOrderService";
import { Tab } from "react-bootstrap";
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { zhCN } from "@mui/x-date-pickers";
import { AccessDenied } from "./AccessDenied";
import AuthService from "../services/AuthService";
import UserService from "../services/UserService";

const options = [
  { value: '1', label: 'styczeń'},
  { value: '2', label: 'luty'},
  { value: '3', label: 'marzec'},
  { value: '4', label: 'kwiecień'},
  { value: '5', label: 'maj'},
  { value: '6', label: 'czerwiec'},
  { value: '7', label: 'lipiec'},
  { value: '8', label: 'sierpień'},
  { value: '9', label: 'wrzesień'},
  { value: '10', label: 'październik'},
  { value: '11', label: 'listopad'},
  { value: '12', label: 'grudzień'},
]



const options2 = [
  { value: '7', label: '7'},
  { value: '14', label: '14'},
  { value: '21', label: '21'},
  { value: '26', label: '26'},
  { value: '30', label: '30'},
]
export function Finances(){
  function format(month){
    if(month == 4 || month == 6 || month == 9 || month == 11){
      return [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
  }
  else if(month == 2){
      if(new Date().getMonth() % 4 == 0){
        return [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29];
      }else
        return [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28];
  }else
      return [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
  }
    const [cars,setCars] = useState(0)
    const [cars2,setCars2] = useState([])

    

    const [days,setDays] = useState(null)
    const[brands, setBrands] = useState([])
    const[brandsB, setBrandsB] = useState([])

    const [gains,setGains] = useState([])
    const [monthlyParallel,setMonthlyParallel] = useState([])
    const [daysFromWeek,setDaysFromWeek] = useState([])
    const [daysFromMonth,setDaysFromMonth] = useState([])
    const [gainFromBrands,setGainFromBrands] = useState([])
    const [gainFromBrandsBr,setGainFromBrandsBr] = useState([])


    var currentDate = new Date();
    var startDate = new Date(currentDate.getFullYear(), 0, 1);
    var days2 = Math.floor((currentDate - startDate) /
    (24 * 60 * 60 * 1000));
   
    var weekNumber = Math.ceil(days2 / 7);

     var nr = (weekNumber - 1) * 7
     
     
     var d = new Date(new Date());
      var day = d.getDay()
       var diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
      var t = new Date(d.setDate(diff));
      var z = new Date(d.setDate(diff));
      z.setDate(z.getDate() - nr + 6)

      t.setDate(t.getDate() - nr )
      (t.toLocaleString().indexOf(','))
      (z.toLocaleString().indexOf(','))

      var firstDate = t.toLocaleString().slice(0,9)
      (t.toLocaleString().slice(0,9).length)
      var secondDate = z.toLocaleString().slice(0,9)

      // t.setDate(t.getDate() + 7)
      // var secondDate = t.toLocaleString().slice(0,10)
      
    
    (nr)
    const g = new Date()
    // ("ez"+g.setDate(g.getDate() - nr))
    (g.toLocaleString())
    // (new Date(g.setDate(getMonday(new Date()) - nr)));
    const [selectedOption2,setSelectedOption2] = useState('')
    const [selectedOption3,setSelectedOption3] = useState('')
    const [selectedOption4,setSelectedOption4] = useState('')
    const options3 = []
  
    for(let i=1;i<=52;i++){
      
      options3.push({value:i, label: i + "       " + firstDate  + ' - '  + secondDate })
      t.setDate(t.getDate() + 7)
      if(t.toLocaleString().slice(0,10).includes(',')){
        firstDate = "0"+t.toLocaleString().slice(0,9)
      }
      else{
        firstDate = t.toLocaleString().slice(0,10)
      }

      z.setDate(z.getDate() + 7)
      if(z.toLocaleString().slice(0,10).includes(',')){
        secondDate = "0"+z.toLocaleString().slice(0,9)
      }
      else{
        secondDate = z.toLocaleString().slice(0,10)
      }
    }

    const [loading,setLoading] = useState(false)

    const [user,setUser] = useState('')
    const [id,setId] = useState('')
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const user = await AuthService.getCurrentUser();
          ("u"+user)
          const response = await UserService.findByEmail(user.email)
          setUser(response.data);
          (user)
          user.roles.map(e => (e.name))
          ("Halo"+response.data)
        } catch (error) {
          (error);
        }
        setLoading(false);
      };
      fetchData();
    }, []);
  
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response5 = await CarService.getBrands();
          setBrands(response5.data);
          (response5.data)
        } catch (error) {
          (error);
        }
        setLoading(false);
      };
      fetchData();
    }, []);
    
      useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          try {
            const response2 = await FullOrderService.monthlyParallel()
            setMonthlyParallel(response2.data)
            ("mp"+response2.data)
            const response3 = await OrderService.gainFromBrands()
            setGainFromBrands(response3.data)
            ("Halo"+response3.data)
            // (response3.data.filter((w,index) => index == 1))
            // response3.data.map((w,index) => ("Jol"+w[index])).map(w => ("B"+w[0]))
           let ar1 = []
           let ar2 = []
            for(let i=0;i< gainFromBrands.length;i++){
              (gainFromBrands[i][0])
              (gainFromBrands[i][1])

              ar1.push(gainFromBrands[i][0])
              ar2.push(gainFromBrands[i][1])

            }
            (ar1)
            (ar2)
            setBrandsB(ar2)
            setGains(ar1)
            (brandsB)
            (gains)

            
            // const response4 = await OrderService.gainFromBrands2()
            // setGainFromBrandsBr(response4.data)
            // (response4.data)
          } catch (error) {
            (error);
          }
          setLoading(false);
        };
        fetchData();
      }, []);

      

      useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          try {
            const response = await FullOrderService.daysFromMonth(selectedOption2.value)
            setDaysFromMonth(response.data)
            
            (response.data)
          } catch (error) {
            (error);
          }
          setLoading(false);
        };
        fetchData();
      }, [selectedOption2]);

      useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          try {
            (selectedOption4.value)
            const response = await FullOrderService.daysFromWeek(selectedOption4.value)
            setDaysFromWeek(response.data)
            (response.data)
            // setFirstDate(Object.keys(daysFromWeek)[0].slice(1,11))
         
            // setSecondDate(Object.keys(daysFromWeek)[0].slice(73,83))

          } catch (error) {
            (error);
          }
          setLoading(false);
        };
        fetchData();
      }, [selectedOption4]);

      useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          try {
            const response = await FullOrderService.gainFromDays(selectedOption3.value)
            setCars(response.data)
            ("Wre"+response.data)
            // const response2 = await OrderService.gainFromDaysOrders(selectedOption3.value)
            // setCars2(response2.data)
            // (response2.data)
            // setFirstDate(Object.keys(daysFromWeek)[0].slice(1,11))
         
            // setSecondDate(Object.keys(daysFromWeek)[0].slice(73,83))

          } catch (error) {
            (error);
          }
          setLoading(false);
        };
        fetchData();
      }, [selectedOption3]);

      // const op =  [{}];
      // for(let i = 0;i<cars.length;i++){
      //   let k = i;
      //     op.push({id: ++k, year: cars[i].brand + ' '+cars[i].model, userGain: cars[i].rentings})
      // }
    
      // const op2 =  [{}];
      // for(let i = 0;i<cars.length;i++){
      //   let k = i;
      //     op2.push({id: ++k, year: cars[i].brand + ' '+cars[i].model, userGain: cars[i].rentings})
      // }
    
      // const op3 =  [{}];
      // for(let i = 0;i<cars.length;i++){
      //   let k = i;
      //     op3.push({id: ++k, year: cars[i].brand + ' '+cars[i].model, userGain: cars[i].rentings})
      // }
    
      // const op4 =  [{}];
      // for(let i = 0;i<cars;i++){
      //   let k = i;
      //     op4.push({id: ++k, year: cars[i].brand + ' '+cars[i].model, userGain: cars[i].rentings})
      // }
    
      const uD = {
        labels: format(selectedOption2.value),
          datasets: [
            {
              label: "Zysk(zł)",
              data: daysFromMonth,
              backgroundColor:'red',
              borderColor: "black",
              borderWidth: 2,
              tension: 0.1
     
            },
          ],
          options:{
            scaleBeginAtZero: true
          }
      }

      // const uD5 = {
      //   labels: cars2.map(o => o.car.brand +' '+ o.car.model),
      //     datasets: [
      //       {
      //         label: "Zysk(zł)",
      //         data: cars2.map(o => o.prize),
      //         backgroundColor:'red',
      //         borderColor: "black",
      //         borderWidth: 2,
      //         tension: 0.1
     
      //       },
      //     ],
      //     options:{
      //       scaleBeginAtZero: true
      //     }
      // }
    
      const uD2 = {
        labels: ['styczeń', 'luty','marzec','kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'],
          datasets: [
            {
              label: "Zysk(zł)",
              data: monthlyParallel,
              backgroundColor:'red',
              borderColor: "black",
              borderWidth: 2,
            },
          ]
      }
    
      const uD3 = {
        labels: ['poniedziałek', 'wtorek','środa','czwartek', 'piątek', 'sobota', 'niedziela'],

          datasets: [
            {
              label: "Zysk(zł)",
              data: daysFromWeek,
              backgroundColor:'red',
              borderColor: "black",
              borderWidth: 2,
            },
          ]
      }
    
      const uD4 = {
        labels: brandsB,
        datasets: [
          {
            label: '# of Votes',
            data: gains,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      }
  
      if(user== null && user.role !== 'ROLE_ADMIN'){
        return <AccessDenied/>
      }else{
        return <div style={{marginTop:80}}>
        <hr></hr>
        <h4>Finanse</h4>
        <hr></hr>

        <span><h5 style={{display: 'inline-block'}}><b>Zyski z ostatnich 
        <div style={{width: 100, display: 'inline-block'}}>
          <Select
          defaultValue={selectedOption3}
          onChange={setSelectedOption3}
          options={options2}
          placeholder=""
          menuPlacement='bottom'
          menuPosition='relative'
          >
          </Select>
        </div> dni</b></h5></span>
        {/* <div style={{height: 1000, width:1000}}><Line data={uD5} /></div> */}
        <TableContainer component={Paper} style={{width:500}}>
        <Table sx={{ maxWidth: 500 }} size="small" aria-label="a dense table">
          <TableBody>
            
              <TableRow
                key={0}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center">Suma: {cars}zł</TableCell>
              </TableRow>
            
          </TableBody>
        </Table>
      </TableContainer>

        <div style={{marginTop:50}}><h5 style={{display:'inline-block'}}><b>Zestawienie miesięczne</b></h5>
        <div style={{width: 200, display: 'inline-block',marginLeft:10}}>
          <Select
          defaultValue={selectedOption2}
          onChange={setSelectedOption2}
          options={options}
          placeholder=""
          menuPlacement='bottom'
          menuPosition='relative'
          
          >
          </Select>
        </div>
        </div>
        <div style={{height: 1000, width:1000}}><Line data={uD} /></div>

        <div style={{marginTop:-450}}><h5 style={{display:'inline-block'}}><b>Zestawienie roczne</b></h5></div>
  
        <div style={{height: 1000, width:1000}}><Line data={uD2} /></div>

        <div style={{marginTop:-450}}><h5 style={{display:'inline-block'}}><b>Zestawienie tygodniowe</b></h5>
        <div style={{width: 500, display: 'inline-block',marginLeft:10}}>
          <Select
          defaultValue={selectedOption4}
          onChange={setSelectedOption4}
          options={options3}
          placeholder=""
          menuPlacement='bottom'
          menuPosition='relative'
          
          >
          </Select>
        </div>
        </div>

        <div style={{height: 1000, width:1000}}><BarChart chartData={uD3} /></div>
        

        <div style={{marginTop:-450}}><h5 style={{display:'inline-block'}}><b>Zestawienie zysku z marek</b></h5></div>
        <div style={{height: 600, width:600}}><Pie data={uD4} /></div>
        <br></br>
        <Footer></Footer>
    </div>
      }
      // { user === null ? <AccessDenied/> : 
      // }
}