import { ReactElement /*,  ReactNode */ } from 'react';
import { ColumnType, ColumnSharedType } from './rc-table/interface';
import { WrappedFormUtils, ValidationRule } from 'antd/lib/form/Form';
import { TableProps } from './rc-table/Table';

type mycomponentType = (width: any) => ReactElement;
// type RuleType
type RuleType =
  | ValidationRule
  | {
      /**
       * 以后想要自定义required，需要传入字符，
       * 在初始化的时候系统会自动去给它绑定到表单里面，如果和其他可编辑表单项同名则跳过
       * 值判断时，如果有一个字符对于的表单值的逻辑值为true则此属性为true
       * 目的是为了大家把需要做的事情都放在onFormValueChange里面
       */
      required: boolean | string;
    };

export interface EditCloumnsType<RecordType> extends ColumnType<RecordType> {
  /* 自定义组件，渲染的优先级高于inputType */
  mycomponent?: ReactElement | mycomponentType;
  /* 列是否可编辑 */
  editable?: boolean;
  /* 行编辑时自定义规则 */
  rule?: RuleType[];
  /**
   * 表单项类型
   * text对应的是普通的input
   * number对应的是数字输入框
   * switch对应的是开关组件
   * time对应的是时间点选择
   * 默认是text
   */
  inputType?: 'text' | 'number' | 'switch' | 'time';
  /**
   * 考虑到表单联动的时候前一个表单值会影响后一个表单项的渲染
   * 跟表单项的required是一样的方式，
   */
  canRender?: string;
  /* 只在新增时候出现此表单项 */
  add?: boolean;
}

export interface EditColumnGroupType<RecordType> extends ColumnSharedType<RecordType> {
  children: EditCloumnsType<RecordType>;
}

export type EditColumnsType<RecordType = unknown> = (
  | EditColumnGroupType<RecordType>
  | EditCloumnsType<RecordType>
)[];

export interface onAddParams<RecordType = unknown> {
  values: RecordType;
  lineId: string;
}

export interface rowSelectionProps<RecordType = unknown> {
  columnWidth?: string | number; // 自定义列表选择框宽度	默认40px
  columnTitle?: string | React.ReactNode; // 自定义列表选择框标题
  fixed?: boolean; // 把选择框列固定在左边
  type?: string; // 多选/单选，checkbox or radio 默认：checkbox
  onChange?: (selectedRowKeys: React.Key[], selectedRows: RecordType[]) => void;
}

export interface onFormValueChangeParams {
  key: string | number;
  changedValues: any;
  allValues: any;
  form: WrappedFormUtils;
}

export interface usedTableProps<RecordType = unknown> extends TableProps<RecordType> {
  rowKey?: string;
  /**
   * 控制当前行是否可编辑
   * 通过传入record 里面的一个属性名
   * 代码通过判断这个属性名对应的属性值是否为false
   */
  cantEditMark?: string;
  /**
   * 控制当前行是否展示编辑
   * 通过传入record 里面的一个属性名
   * 代码通过判断这个属性名对应的属性值是否为false
   */
  hideEditMark?: string;
  /* 分页参数 */
  pagination?: {
    total: number; // 总数量
    pageSize: number; // 每页数量
    current: number; // 当前页
  };
  /* 响应分页变化 */
  pageChange?: (page: number, pageSize?: number) => void;
  /* 响应删除, 删除的时候必然会更新数据。 更新数据的时候会重置selectKeys*/
  onDelete?: (selectKeys: any[]) => void;
  /**
   * 测试了俩种方式1、传递callback。2、接收一个promise
   * 测试发现。通过callback执行效率比接收promise执行高，但是会产生大量闭包，导致内存增加
   * 最后还是选用promise
   */
  onEdit?: (values: RecordType) => Promise<boolean>;
  /* 响应新增 */
  onAdd?: (params: onAddParams<RecordType>) => Promise<boolean>;
  /* 数据源 */
  dataSource: Record<string, any>[];
  /* 是否开启编辑，默认为是 */
  edit?: boolean;
  /* 自定义当前正在编辑的行,主要的作用是初始化编辑行 */
  editingKey?: string | number[];
  operationProps?: EditCloumnsType<RecordType>;
  /* 操作列表额外渲染的内容 */
  operationExtraCom?: (record: any) => React.ReactNode;
  rowSelection?: rowSelectionProps;
  /* 响应编辑行表单变化 */
  onFormValueChange?: (p: onFormValueChangeParams) => void;
}
