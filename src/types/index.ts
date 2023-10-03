export interface Task {
    id: string;
    title: string;
    description: string; // Mô tả công việc
    deadline: Date; // Thời hạn hoàn thành
    priority: 'low' | 'medium' | 'high'; // Ưu tiên công việc
    status: 'todo' | 'doing' | 'done' ; // Trạng thái công việc
    tags: string[]; // Các nhãn liên quan
    estimatedTime: number; // Thời gian dự kiến hoàn thành (đơn vị giờ)
    completionPercentage: number; // Phần trăm hoàn thành công việc
}
export interface TasksState {
    todo: Task[];
    doing: Task[];
    done: Task[];
    overdue: Task[];
}

