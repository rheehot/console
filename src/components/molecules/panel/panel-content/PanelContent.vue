<template>
    <p-dl class="row">
        <div v-for="(def, idx) in definitionList" :key="idx" class="col-sm-12 col-md-6 content-list">
            <slot name="details">
                <p-dt class="col-sm-12 col-md-6">{{ def.header }}</p-dt>
                <p-dd class="col-sm-12 col-md-6">{{ def.content }}</p-dd>
            </slot>
        </div>
    </p-dl>
</template>

<script>
import PDt from '@/components/atoms/definition/dt/Dt';
import PDl from '@/components/atoms/definition/dl/Dl';
import PDd from '@/components/atoms/definition/dd/Dd';

export default {
    name: 'PanelContent',
    components: {
        PDt,
        PDl,
        PDd,
    },
    props: {
        definitionList: {
            type: Array,
            default: () => [],
        },
    },
    methods: {

    },
};
</script>

<style lang="scss" scoped>
    .content-list {
        > dt {
            float: left;
            overflow: hidden;
            clear: left;
            text-align: left;
            text-overflow: ellipsis;
            white-space: nowrap;
            min-height: 20px;
            padding: 0rem 1rem 0rem 1rem;
            text-align: left;
            font: Bold 14px/32px Arial;
            letter-spacing: 0;
            color: $gray1;
        }
        > dd {
            overflow: hidden;
            min-height: 20px;
            text-align: left;
            font: 14px/32px Arial;
            color: #222532;
            opacity: 1;


        }
    }
</style>