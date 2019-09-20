import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsGantt from 'highcharts/modules/gantt';
import Modules from 'highcharts/modules/draggable-points';
import Exporting from 'highcharts/modules/exporting';
import ExportData from 'highcharts/modules/export-data';
if (typeof Highcharts === 'object') {
  highchartsGantt(Highcharts);
  Modules(Highcharts);
  Exporting(Highcharts);
  ExportData(Highcharts);
}

var today = new Date(),
  day = 1000 * 60 * 60 * 24,
  // Utility functions
  dateFormat = Highcharts.dateFormat,
  defined = Highcharts.defined,
  isObject = Highcharts.isObject,
  reduce = Highcharts.reduce;

// Set to 00:00:00:000 today
today.setUTCHours(0);
today.setUTCMinutes(0);
today.setUTCSeconds(0);
today.setUTCMilliseconds(0);
today = today.getTime();
let names = {
  Peter: 'red',
  Linda: 'orange',
  Ivy: 'yellow',
  Josh: 'green',
  Mark: 'blue',
  Anne: 'purple',
  '': 'black',
  Susan: 'pink',
};

const options = {
  navigator: {
    enabled: true,
    liveRedraw: true,
    series: {
      type: 'gantt',
    },
  },
  scrollbar: {
    enabled: true,
  },
  rangeSelector: {
    enabled: true,
    selected: 0,
  },
  plotOptions: {
    series: {
      animation: false,
      dragDrop: {
        draggableX: true,
        draggableY: true,
        dragMinY: 0,
        dragMaxY: 2,
        dragPrecisionX: day / 3, // Snap to eight hours
      },
      dataLabels: {
        enabled: true,
        format: '{point.name}',
        style: {
          cursor: 'default',
          pointerEvents: 'none',
        },
      },
      allowPointSelect: true,
      point: {
        events: {
          // select: updateRemoveButtonStatus,
          // unselect: updateRemoveButtonStatus,
          // remove: updateRemoveButtonStatus,
        },
      },
    },
  },
  tooltip: {
    pointFormatter: function() {
      var point = this,
        format = '%b %d',
        options = point.options,
        completed = options.completed,
        amount = isObject(completed) ? completed.amount : completed,
        status = (amount || 0) * 100 + '%',
        lines;

      lines = [
        {
          value: point.name,
          style: 'font-weight: bold;',
        },
        {
          title: 'Start',
          value: dateFormat(format, point.start),
        },
        {
          visible: !options.milestone,
          title: 'End',
          value: dateFormat(format, point.end),
        },
        {
          title: 'Completed',
          value: status,
        },
        {
          title: 'Owner',
          value: options.owner || 'unassigned',
        },
      ];

      return reduce(
        lines,
        function(str, line) {
          var s = '',
            style = defined(line.style) ? line.style : 'font-size: 0.8em;';
          if (line.visible !== false) {
            s =
              '<span style="' +
              style +
              '">' +
              (defined(line.title) ? line.title + ': ' : '') +
              (defined(line.value) ? line.value : '') +
              '</span><br/>';
          }
          return str + s;
        },
        '',
      );
    },
  },
  xAxis: {
    currentDateIndicator: true,
    // min: today - 3 * day,
    // max: today + 18 * day,
  },
  series: [
    {
      name: 'Offices',
      data: [
        {
          name: 'New offices',
          id: 'new_offices',
          owner: 'Peter',
          color: names['Peter'],
        },
        {
          name: 'Prepare office building',
          id: 'prepare_building',
          parent: 'new_offices',
          start: today - 2 * day,
          end: today + 6 * day,
          completed: 0.2,
          owner: 'Linda',
          color: names['Linda'],
        },
        {
          name: 'Inspect building',
          id: 'inspect_building',
          dependency: 'prepare_building',
          parent: 'new_offices',
          start: today + 6 * day,
          end: today + 8 * day,
          owner: 'Ivy',
          color: names['Ivy'],
        },
        {
          name: 'Passed inspection',
          id: 'passed_inspection',
          dependency: 'inspect_building',
          parent: 'new_offices',
          start: today + 9.5 * day,
          milestone: true,
          owner: 'Peter',
          color: names['Peter'],
        },
        {
          name: 'Relocate',
          id: 'relocate',
          dependency: 'passed_inspection',
          parent: 'new_offices',
          owner: 'Josh',
          color: names['Josh'],
        },
        {
          name: 'Relocate staff',
          id: 'relocate_staff',
          parent: 'relocate',
          start: today + 10 * day,
          end: today + 11 * day,
          owner: 'Mark',
          color: names['Mark'],
        },
        {
          name: 'Relocate test facility',
          dependency: 'relocate_staff',
          parent: 'relocate',
          start: today + 11 * day,
          end: today + 13 * day,
          owner: 'Anne',
          color: names['Anne'],
        },
        {
          name: 'Relocate cantina',
          dependency: 'relocate_staff',
          parent: 'relocate',
          start: today + 11 * day,
          end: today + 14 * day,
          color: names[''],
        },
        {
          name: 'Test',
          dependency: 'relocate_staff',
          parent: 'relocate',
          start: today + 11 * day,
          end: today + 14 * day,
          color: names[''],
        },
      ],
    },
    {
      name: 'Product',
      data: [
        {
          name: 'New product launch',
          id: 'new_product',
          owner: 'Peter',
          color: names['Peter'],
        },
        {
          name: 'Development',
          id: 'development',
          parent: 'new_product',
          start: today - day,
          end: today + 11 * day,
          completed: 0.6,

          owner: 'Susan',
          color: names['Susan'],
        },
        {
          name: 'Beta',
          id: 'beta',
          dependency: 'development',
          parent: 'new_product',
          start: today + 12.5 * day,
          milestone: true,
          owner: 'Peter',
          color: names['Peter'],
        },
        {
          name: 'Final development',
          id: 'finalize',
          dependency: 'beta',
          parent: 'new_product',
          start: today + 13 * day,
          end: today + 17 * day,
          color: names[''],
        },
        {
          name: 'Launch',
          dependency: 'finalize',
          parent: 'new_product',
          start: today + 17.5 * day,
          milestone: true,
          owner: 'Peter',
          color: names['Peter'],
        },
      ],
    },
  ],
};

export default function Gantt() {
  return (
    <>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'ganttChart'}
        options={options}
      />
    </>
  );
}
