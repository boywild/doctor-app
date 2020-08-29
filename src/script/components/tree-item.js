Vue.component('tree-item', {
    name: 'TreeItem',
    props: {
        data: {
            type: [Object, Array],
            required: true,
        },
        nodeId: {
            type: String,
            required: true,
        },
    },
    template: `
    <li class="menu-item">
        <div class="menu-title" :class="[open||data.open?'active':'',nodeId===data.node_id||data.checked?'current':'']" @click.capture="toggle">
            <span class="text">{{ data.name }}{{data.node_id}}</span>
            <van-icon v-if="hasChild" name="play"></van-icon>
        </div>
        <ul class="child-menu menu" v-show="data.open||open" v-if="hasChild">
            <tree-item v-for="(item, index) in data.children" :data="item" :key="index" :node-id="nodeId" @checked="emitEvent(item.node_id)" @reset="emitReset"></tree-item>
        </ul>
    </li>
    `,
    data() {
        return {
            open: false,
        }
    },
    computed: {
        hasChild() {
            return this.data.children && this.data.children.length
        },
    },
    methods: {
        toggle() {
            console.log('================', this.data)
            this.emitReset()
            if (this.hasChild) {
                this.open = !this.open
            } else {
                this.emitEvent(this.data.node_id)
                // this.currentNodeId = this.data.node_id
            }
        },
        emitEvent(id) {
            console.log(id)
            this.$emit('checked', id)
        },
        emitReset() {
            this.$emit('reset')
        },
    },
})
