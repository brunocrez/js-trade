import { TradeController } from './controllers/TradeController';

let tradeController = new TradeController();

document.querySelector('.form').onsubmit = tradeController.addTrade.bind(tradeController);
document.querySelector('#clearButton').onclick = tradeController.clearTrades.bind(tradeController);