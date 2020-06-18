import { View } from './View';
import { DateHelper } from '../helpers/DateHelper';

export class TradeView extends View {

    constructor(element) {
        super(element);
    }

    renderTemplate(tradeList) {
            return `
            <table class="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th scope="col">DATA</th>
                        <th scope="col">QUANTIDADE</th>
                        <th scope="col">VALOR</th>
                        <th scope="col">VOLUME</th>
                    </tr>
                </thead>
                <tbody>
                    ${tradeList.list.map(item => 
                        `
                            <tr>
                                <td>${DateHelper.dateToString(item.date)}</td>
                                <td>${item.quantity}</td>
                                <td>${item.value}</td>
                                <td>${item.volume}</td>
                            </tr>
                        `
                    ).join('')}
                </tbody>
                <tfoot>
                    <td colspan="3"></td>
                    <td>${tradeList.list.reduce((current, next) => current + next.volume, 0)}</td>                    
                </tfoot>
            </table>
        `;
    }
}