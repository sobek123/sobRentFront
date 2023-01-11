import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { TableContainer } from '@mui/material';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export function CustomTable(props){
    return <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
      <TableHead>
      <TableRow >
            <TableCell rowSpan={2}><b>Marka i model pojazdu</b></TableCell>
            <TableCell colSpan={7} style={{textAlign:'center'}}><b>Cena za określoną ilość dni wynjamu pojazdu + kaucja podane w zł</b></TableCell>
        </TableRow>
        <TableRow >
            <TableCell align="center"><b>1</b></TableCell>
            <TableCell align="center"><b>2-3</b></TableCell>
            <TableCell align="center"><b>4-8</b></TableCell>
            <TableCell align="center"><b>9-16</b></TableCell>
            <TableCell align="center"><b>16-29</b></TableCell>
            <TableCell align="center"><b>powyżej 29</b></TableCell>
            <TableCell align="center"><b>Kaucja</b></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.cars.map((row) => (
          <TableRow
            key={row.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              <b>{row.brand} {row.model}</b>
              </TableCell>
            <TableCell align="center">{row.price.firstPeriod}</TableCell>
            <TableCell align="center">{row.price.secondPeriod}</TableCell>
            <TableCell align="center">{row.price.thirdPeriod}</TableCell>
            <TableCell align="center">{row.price.fourthPeriod}</TableCell>
            <TableCell align="center">{row.price.fifthPeriod}</TableCell>
            <TableCell align="center">{row.price.sixthPeriod}</TableCell>
            <TableCell align="center">{row.price.deposit}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
}