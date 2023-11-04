import { CSVParseParam } from 'csvtojson/v2/Parameters';

export const csvParseParams: Partial<CSVParseParam> = {
  delimiter: '\t',
  ignoreColumns: /(_count|clubs)/,
  includeColumns: /(favorites_count|score_count)/,
  colParser: {
    pics: (item, head, resultRow, row, colIdx) => {
      return item.split('|');
    },
    genres: (item, head, resultRow, row, colIdx) => {
      return item.split('|');
    },
  },
};
