<template>
  <span class='value'>
    <template v-if='ref'>
      <a href="#/" @click.stop="$emit('nodeClicked', ref)">{{ref}}</a>
    </template>
    <template v-else-if="url">
      <a :href='url' target="_blank">{{url}}</a>
    </template>
    <template v-else-if="isInTable">
      <pre>{{tnode.value}}</pre>
    </template>
    <template v-else>{{tnode.value}}</template>
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { TDNode } from 'treedoc';
import TreeState from '../models/TreeState';
import TreeUtil from '../models/TreeUtil';

@Component
export default class SimpleValue extends Vue {
  @Prop() tnode!: TDNode;
  @Prop({required: false, default: false}) isInTable!: boolean;

  get ref() {
    if (this.tnode.key !== TreeUtil.KEY_REF || typeof(this.tnode.value) !== 'string')
      return null;
    return this.tnode.value;
  }

  get url() {
    const val = this.tnode.value;
    if (typeof(val) === 'string' && (val.startsWith('http://') || val.startsWith('https://')))
      return val;
  }
}
</script>
