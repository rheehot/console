import {
    computed, reactive, Ref, ref,
} from '@vue/composition-api';

type TreeNode = any;

export type TreeStateType = {
    selected?: boolean;
    selectable?: boolean;
    checked?: boolean;
    expanded?: boolean;
    disabled?: boolean;
    visible?: boolean;
    indeterminate?: boolean;
    matched?: boolean;
    editable?: boolean;
    dragging?: boolean;
    draggable?: boolean;
    dropable?: boolean;
}

export interface TreeOptionsInterface {
    multiple?: boolean;
    checkbox?: boolean;
    checkOnSelect?: boolean;
    autoCheckChildren?: boolean;
    parentSelect?: boolean;
    keyboardNavigation?: boolean;
    propertyNames?: {
        id?: string,
        text?: string,
        children?: string,
        isBatch?: string,
    };
    deletion?: [boolean, (node: TreeNode) => boolean];
    fetchData?: (node: TreeNode) => Promise<any>;
    dnd?: {
        onDragStart?: (node: TreeNode) => boolean;
        onDragOn?: (targetNode: TreeNode, destinationNode: TreeNode) => boolean;
        onDragFinish?: (targetNode: TreeNode, destinationNode: TreeNode) => boolean;
    };
    editing?: object;
    nodeIndent?: number;
}

export interface TreeItemInterface {
    id?: number;
    text: string;
    data?: object;
    children?: TreeItemInterface[];
    state?: TreeStateType;
    isBatch?: boolean; // does it have child nodes
}

export default class TreeItem implements TreeItemInterface {
    public id?: number;

    public text: string;

    public data?: object;

    public children?: TreeItemInterface[];

    public state?: TreeStateType;

    constructor(text: string, data?: object, children?: TreeItemInterface[], state?: TreeStateType, id?: number) {
        this.text = text;
        this.data = data;
        this.children = children;
        this.state = state;
        this.id = id;
    }
}

interface TreeIconsType {
    leaf: string;
    expanded: string;
    collapsed: string;
}

export interface TreePropsInterface {
    data?: any[];
    options?: TreeOptionsInterface;
    icons?: TreeIconsType;
    loading?: boolean;
    selectMode?: boolean;
}

export class TreeState {
    public state: TreePropsInterface;

    static initTreeState: TreePropsInterface = {
        icons: {
            leaf: 'ic_tree_project',
            expanded: 'ic_tree_folder--opened',
            collapsed: 'ic_tree_folder',
        },
        loading: false,
        selectMode: false,
    };

    constructor(initData:any = {}) {
        this.state = reactive({
            ...TreeState.initTreeState,
            data: initData.data || [],
            options: initData.options || {},
            ...initData,
        });
    }
}


export const treeProps = {
    /**
     * tree data for initiation and it's not reactive.
     * @type {Array, Object}
     * */
    data: {
        type: [Array, Object],
        default: undefined,
    },
    /**
     * tree options that follows LiquorTree's options format. it's not reactive.
     * @type {TreeOptionsInterface}
     * */
    options: {
        type: Object,
        default: () => ({}),
    },
    /**
     * tree icons
     * @type {TreeIconsInterface}
     */
    icons: {
        type: Object,
        default: () => ({
            leaf: 'ic_tree_project',
            expanded: 'ic_tree_folder--opened',
            collapsed: 'ic_tree_folder',
        }),
    },
    loading: {
        type: Boolean,
        default: false,
    },
    selectMode: {
        type: Boolean,
        default: false,
    },
};

export class TreeToolSet extends TreeState {
    public metaState = reactive({
        selectedNode: null,
        firstSelectedNode: computed(() => {
            try {
                return this.metaState.selectedNode[0];
            } catch (e) {
                return null;
            }
        }),
    });

    constructor(initData:any = {}, public treeApi:Ref<any> = ref(null)) {
        super({ ...initData });
    }

    public getSelectedNode() {
        this.metaState.selectedNode = this.treeApi.value.$refs.tree.selected();
    }
}