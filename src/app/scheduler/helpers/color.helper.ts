import { PlanItemStatusEnum } from "../models/event.model";

export class ColorHelper {

    static getGradient(data: {startMarginProcent: number, durationMarginProcent: number}[],
            isHorizontalView: boolean, primaryColor: string, secondaryColor: string) {
        let gradient = `linear-gradient(${isHorizontalView ? 'to bottom' : 'to right'},${secondaryColor}`;
        data.forEach(element => {
          gradient += `,${secondaryColor} ${element.startMarginProcent}%`;
          gradient += `,${primaryColor} ${element.startMarginProcent}%`;
          gradient += `,${primaryColor} ${element.startMarginProcent + element.durationMarginProcent}%`;
          gradient += `,${secondaryColor} ${element.startMarginProcent + element.durationMarginProcent}%`;
        });
        gradient += ')';
        return gradient;
    }

    static shadeColor(color, percent) {

        let R = parseInt(color.substring(1, 3), 16);
        let G = parseInt(color.substring(3, 5), 16);
        let B = parseInt(color.substring(5, 7), 16);

        R = Math.round(R * (100 + percent) / 100);
        G = Math.round(G * (100 + percent) / 100);
        B = Math.round(B * (100 + percent) / 100);

        R = (R < 255) ? R : 255;
        G = (G < 255) ? G : 255;
        B = (B < 255) ? B : 255;

        const RR = ((R.toString(16).length === 1) ? '0' + R.toString(16) : R.toString(16));
        const GG = ((G.toString(16).length === 1) ? '0' + G.toString(16) : G.toString(16));
        const BB = ((B.toString(16).length === 1) ? '0' + B.toString(16) : B.toString(16));

        return '#' + RR + GG + BB;
    }
    static colorMapper(planItemStatus: PlanItemStatusEnum) {
      switch (planItemStatus) {
          case PlanItemStatusEnum.Running:
              return '#6cb56c';
          case PlanItemStatusEnum.Finished:
              return '#8b8c8c';
          case PlanItemStatusEnum.Canceled:
              return '#d41140';
          case PlanItemStatusEnum.Break:
              return '#dcb843';
          case PlanItemStatusEnum.ExternalyClosed:
              return '#8b8c8c';
      }
      return '#337ab7';
  }
}

