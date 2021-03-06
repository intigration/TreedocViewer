<template>

  <div id='app' class='components-container'>
    <h6 class="title">
      Treedoc Viewer for JSON, Prototext, jsonex, json5, hjson, yaml, xml
      <a href='https://github.com/treedoc/TreedocViewer' target="_blank"><img alt="GitHub stars" src="https://img.shields.io/github/stars/treedoc/treedocviewer"></a>
      <a href='https://github.com/treedoc/TreedocViewer/issues' target="_blank"><img alt="GitHub issues" src="https://img.shields.io/github/issues/treedoc/treedocviewer"></a>
      <a href='https://www.npmjs.com/package/treedoc-viewer' target="_blank"><img alt="npm" src="https://img.shields.io/npm/v/treedoc-viewer"></a>
      | <a href='https://www.reddit.com/r/javascript/comments/el6bs2/treedoc_viewer_is_a_featurerich_viewer_for/' title="Discuss on Reddit" target="_blank">
        <i class="fa fa-reddit"></i>
      </a>
      <!--| <a href='http://p/treedoc' target="_blank" title="Vote on pegboard">Vote on p/treedoc</i></a> http://go/treedoc -->
    </h6> 
    
    <json-tree-table v-if="true" :data='selectedSample' :inital-path="'activityHistory'" :options='jttOption' rootObjectKey='root' class="json-tree-table">
      Sample Data: <b-form-select v-model="selectedSample" :options="sampleData" size='sm' style="width:auto" />
    </json-tree-table>
    <div v-if=false>
      <hr />
      <div>Json Table</div>
      <json-table :table-data="tstateTable" :options="jsonTableOptions"/>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

import JsonTreeTable from './components/JsonTreeTable.vue';
import JsonTable from './components/JsonTable.vue';
import sampleData from './sampleData';
import TreeState from './models/TreeState';
import TDSample from './tdSample.vue';
import JTTOptions from './models/JTTOption';
import YAMLParser from './parsers/YAMLParser';
import XMLParser from './parsers/XMLParser';

@Component({
  components: {
    JsonTreeTable,
    JsonTable,
  },
})
export default class App extends Vue {
  sampleData = sampleData.data;
  selectedSample  = sampleData.data[0].value;
  jsonTableOptions = {
    Pagination: false,
    columns: [
      { field: 'activityType' },
      {
        field: 'partitionKey',
        tdComp: TDSample,
      },
      {
        field: 'creationDate',
        html: (value: any, row: any) => `<a href="http://abc.com/${row.runtimeContext.value}">${value.value}</a>`,
      },
    ],
  };
  jttOption: JTTOptions = {
    parsers: [
      new YAMLParser(),
      new XMLParser('XML compact', 'text/xml', true),
      new XMLParser(),
      new XMLParser('html', 'text/html'),
      ],
  };

  get tstateTable() {
    const state = new TreeState(sampleData.jsonStr);
    const n = state.tree.root.getByPath('/activityHistory');
    if (n)
      state.select(n, true);
    return state;
  }
}
</script>

<style>
.title {
  text-align: center;
  color: darkblue
}
.components-container {
  display: flex;
  position: absolute;
  flex-direction: column;
  margin-left: 2px;
  width: 99%;
  /* background-color: #ff0; */
  height: 98%;
  /* overflow: auto; */
  /* min-height:100%;
  min-width:100%; */
}
html {
  height: 100%;
}
body {
  min-height: 100%;
}
.inputline {
  display: flex;
  align-items: center;
  float:right;
}
.json-tree-table {
  /* background-color: rgba(0, 0, 255, 0.16); */
  height: 100%;
  /* overflow: auto; */
}
</style>
