import {Cliente} from "./Client";
import {JournalLine} from "./JournalLine";
import * as yup from "yup";
import App from "../App";

interface JournalDTO {
  code: string;
  account: string;
  amount: number;
  operation: string;
}

class Journal {
  date: Date;
  client: Cliente;
  concept: string;
  lines: JournalLine[];

  constructor(date: Date, client: Cliente, concept: string) {
    this.date = date;
    this.client = client;
    this.concept = concept;
    this.lines = [];
  }

  getTotalDebit(): number {
    return this.lines.reduce((acc, line) => acc + line.debit, 0);
  }

  getTotalCredit(): number {
    return this.lines.reduce((acc, line) => acc + line.credit, 0);
  }

  validateTotalsAreEquals(): boolean {
    return this.getTotalCredit() === this.getTotalDebit();
  }

  addLine(journalDto: JournalDTO) {
    let schema = yup.object().shape({
      code: yup.string().required(),
      account: yup.string().required(),
      amount: yup.number().required(),
      operation: yup.string().max(1).required(),
    });

    const validatedData = schema.validateSync(journalDto);

    if (journalDto.operation === "C") {
      this.lines.push(
        new JournalLine(
          validatedData.code,
          validatedData.account,
          0,
          validatedData.amount,
          this
        )
      );
    } else {
      this.lines.push(
        new JournalLine(
          validatedData.code,
          validatedData.account,
          validatedData.amount,
          0,
          this
        )
      );
    }
  }

  // Creando un nuevo método llamado deleteLine.
  deleteLine() {
    // Mostrantrando las lineas con las que estamos trabajando.

    const linesCopy: JournalLine[] = this.lines.slice();
    //con slice creamos una copia del arreglo original

    console.log(
      `----------------------- Lineas Iniciales ---------------------- \n \n `,
      linesCopy
    );

    // Eliminando una linea del comprobante.

    /* en dado caso que se quieran eliminar varias lineas se deberá escribir 
    index != 1 && index != 2, para que ambas lineas sean eliminadas */

    let nuevoArreglo: JournalLine[];

    nuevoArreglo = this.lines.filter((a, index) => index != 2);

    console.log(
      `-------------------- Lineas ya modificadas -------------------- \n \n `,
      nuevoArreglo
    );
  }
}

export {Journal};
