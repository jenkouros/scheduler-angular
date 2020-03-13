import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as moment from 'moment';
import * as fs from 'file-saver';
import { PlannedEvent } from '../models/event.model';


@Injectable({
  providedIn: 'root'
})
export class ExcelService {
constructor() { }

createExcel(data: PlannedEvent[]) {
  console.log(data);
  const header = ['Stroj', 'Koda artikla', 'PNN', 'Nalog', 'Zap. št./Operacija', 'Količina', 'Začetni čas priprave',
  'Začetni datum', 'Končni datum', 'Opomba' ];
  const newData = data.map(row => ({
  containerId: row.itemName,
  articleCode: row.articleCode,
  articleName: row.articleName,
  subItemName: row.subItemName,
  workOrder: row.idItemBatch + '/' + row.idPlan,
  manufacturedQuantity: row.manufacturedQuantity,
  quantity: row.quantity,
  sequenceNumber: row.sequencePlanItems.findIndex(x => x.code === row.subItemCode) + 1,
  comment: row.description,
  timeStartPreparation: row.timeStartPreparation,
  startDate: row.startDate,
  endDate: row.endDate,
  }));
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet('Planiranje');

  const headerRow = worksheet.addRow(header);

  headerRow.eachCell((cell, number) => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFD8D8D8' },
      bgColor: { argb: 'FFD8D8D8' }
    // tslint:disable-next-line:semicolon
    }
    cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
  });
  for (let i = 0; i < newData.length ; i++) {
      let containerId;
      if (i > 0) {
        if (newData[i].containerId !== newData[i - 1].containerId) {
          containerId = newData[i].containerId;
        }
      } else {
        containerId = newData[i].containerId;
    }
    if (newData[i].manufacturedQuantity === null) {
      newData[i].manufacturedQuantity = 0;
    }
    worksheet.addRow(
      [
      containerId,
      newData[i].articleCode,
      newData[i].articleName,
      newData[i].workOrder,
      newData[i].sequenceNumber + '/' + newData[i].subItemName,
      newData[i].manufacturedQuantity + ' (' + newData[i].quantity + ')',
      moment(new Date(newData[i].timeStartPreparation)).format('DD/MM/YYYY HH:MM:SS'),
      moment(new Date(newData[i].startDate)).format('DD/MM/YYYY HH:MM:SS'),
      moment(new Date(newData[i].endDate)).format('DD/MM/YYYY HH:MM:SS'),
      newData[i].comment]);
  }

  worksheet.getColumn(1).width = 25;
  worksheet.getColumn(2).width = 15;
  worksheet.getColumn(3).width = 30;
  worksheet.getColumn(4).width = 15;
  worksheet.getColumn(5).width = 30;
  worksheet.getColumn(6).width = 20;
  worksheet.getColumn(7).width = 20;
  worksheet.getColumn(8).width = 20;
  worksheet.getColumn(9).width = 20;
  worksheet.getColumn(10).width = 50;
  worksheet.addRow([]);

  worksheet.getColumn(1).font = { bold: true };
  worksheet.getRow(1).font = { bold: true };

  // tslint:disable-next-line:no-shadowed-variable
  workbook.xlsx.writeBuffer().then((newData: any) => {
    const blob = new Blob([newData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
     fs.saveAs(blob, 'PlaniranjeIzvoz.xlsx');
});
}
}
