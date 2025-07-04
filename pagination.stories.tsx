import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Pagination } from "./index";

const meta: Meta<typeof Pagination> = {
  title: "Example/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
## 定义
分页器是一个导航元素，允许用户浏览大量内容，将其分成多个页面。

## 组件类型
- **基本型**: 只包含上一页、下一页和页码。
- **完整型**: 包含上一页、下一页、页码以及省略号，用于处理大量页面的情况。

## 使用原则
- 当内容项超过一页的容量时使用。
- 保持设计简洁，避免过多不必要的控件。
- 在第一页和最后一页时，应禁用"上一页"和"下一页"按钮。

## 组件引入
\`\`\`tsx
import { Pagination } from '@oversea/pagination'

<Pagination total={10} page={1} />
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Demo01: Story = {
  name: "基本使用",
  parameters: {
    docs: {
      description: {
        story: "一个基本的分页器组件。",
      },
    },
  },
  render: () => {
    const Demo = () => {
      const [page, setPage] = React.useState(1);
      return <Pagination total={8} page={page} onChange={setPage} />;
    };
    return <Demo />;
  },
};

export const Demo02: Story = {
  name: "更多页码",
  parameters: {
    docs: {
      description: {
        story: "当页数很多时，会自动显示省略号。",
      },
    },
  },
  render: () => {
    const Demo = () => {
      const [page, setPage] = React.useState(10);
      return <Pagination total={20} page={page} onChange={setPage} />;
    };
    return <Demo />;
  },
};

export const Demo03: Story = {
  name: "受控模式",
  parameters: {
    docs: {
      description: {
        story: "通过 page 和 onChange 属性来完全控制组件的状态。",
      },
    },
  },
  render: () => {
    const Demo = () => {
      const [page, setPage] = React.useState(5);
      const handleChange = (newPage: number) => {
        setPage(newPage);
      };

      return (
        <div className="flex flex-col gap-4 items-center">
          <Pagination total={10} page={page} onChange={handleChange} />
          <span className="text-text-primary">Current Page: {page}</span>
        </div>
      );
    };
    return <Demo />;
  },
};

export const Demo04: Story = {
  name: "兄弟节点数量",
  parameters: {
    docs: {
      description: {
        story: "通过 `siblings` 属性可以控制当前页码左右两侧显示的页码数量，默认为 1",
      },
    },
  },
  render: function Render() {
    const [page, setPage] = React.useState(10);
    const TOTAL_PAGES = 200;

    return (
      <div className="flex flex-col gap-4">
        <Pagination
          total={TOTAL_PAGES}
          page={page}
          siblings={2}
          onChange={(p) => setPage(p)}
        />
        <Pagination
          total={TOTAL_PAGES}
          page={page}
          siblings={3}
          onChange={(p) => setPage(p)}
        />
        <Pagination
          total={TOTAL_PAGES}
          page={page}
          siblings={4}
          onChange={(p) => setPage(p)}
        />
      </div>
    );
  },
};

export const Demo05: Story = {
  name: "边界节点数量",
  parameters: {
    docs: {
      description: {
        story: "通过 `boundaries` 属性可以控制首尾两侧显示的页码数量，默认为 1",
      },
    },
  },
  render: function Render() {
    const [page, setPage] = React.useState(10);
    const TOTAL_PAGES = 200;

    return (
      <div className="flex flex-col gap-4">
        <Pagination
          total={TOTAL_PAGES}
          page={page}
          boundaries={1}
          onChange={(p) => setPage(p)}
        />
        <Pagination
          total={TOTAL_PAGES}
          page={page}
          boundaries={2}
          onChange={(p) => setPage(p)}
        />
        <Pagination
          total={TOTAL_PAGES}
          page={page}
          boundaries={3}
          onChange={(p) => setPage(p)}
        />
      </div>
    );
  },
};

export const API: Story = {
  parameters: {
    previewTabs: {
      canvas: {
        hidden: true,
      },
    },
    viewMode: "docs",
    docs: {
      description: {
        story: `
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|---|---|---|-----|---|
| total | 总页数 | number | 1 | 否 |
| page | 当前页码 | number | 1 | 否 |
| siblings | 当前页码左右两侧显示的页码数量 | number | 1 | 否 |
| boundaries | 首尾两侧显示的页码数量 | number | 1 | 否 |
| onChange | 页码改变时的回调函数 | (page: number) => void | - | 否 |
`,
      },
    },
  },
  render: () => {
    return null;
  },
};
