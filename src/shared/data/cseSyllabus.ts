import type { University } from '@/shared/types/syllabus.types'

export const cseSyllabus: University = {
    id: 'anna-university',
    name: 'Anna University',
    shortName: 'AU',
    semesters: [
        {
            id: 'sem-3',
            number: 3,
            subjects: [
                {
                    id: 'cs301-dsa',
                    name: 'Data Structures and Algorithms',
                    code: 'CS301',
                    credits: 4,
                    modules: [
                        {
                            id: 'cs301-m1',
                            name: 'Linear Data Structures',
                            order: 1,
                            topics: [
                                { id: 'cs301-m1-t1', name: 'Arrays and Their Operations', order: 1, description: 'Static and dynamic arrays, insertion, deletion, traversal' },
                                { id: 'cs301-m1-t2', name: 'Linked Lists', order: 2, description: 'Singly, doubly, circular linked lists and operations' },
                                { id: 'cs301-m1-t3', name: 'Stacks', order: 3, description: 'Stack ADT, implementations, applications (infix to postfix)' },
                                { id: 'cs301-m1-t4', name: 'Queues', order: 4, description: 'Queue ADT, circular queue, priority queue, deque' },
                            ],
                        },
                        {
                            id: 'cs301-m2',
                            name: 'Trees',
                            order: 2,
                            topics: [
                                { id: 'cs301-m2-t1', name: 'Binary Trees', order: 1, description: 'Tree terminology, binary tree properties, traversals' },
                                { id: 'cs301-m2-t2', name: 'Binary Search Trees', order: 2, description: 'BST operations: search, insert, delete, balancing' },
                                { id: 'cs301-m2-t3', name: 'AVL Trees', order: 3, description: 'Self-balancing BST, rotations, height balance' },
                                { id: 'cs301-m2-t4', name: 'Heap and Priority Queue', order: 4, description: 'Min-heap, max-heap, heapify, heap sort' },
                            ],
                        },
                        {
                            id: 'cs301-m3',
                            name: 'Graphs',
                            order: 3,
                            topics: [
                                { id: 'cs301-m3-t1', name: 'Graph Representations', order: 1, description: 'Adjacency matrix, adjacency list, edge list' },
                                { id: 'cs301-m3-t2', name: 'Graph Traversals', order: 2, description: 'BFS and DFS algorithms, applications' },
                                { id: 'cs301-m3-t3', name: 'Shortest Path Algorithms', order: 3, description: 'Dijkstra, Bellman-Ford, Floyd-Warshall' },
                                { id: 'cs301-m3-t4', name: 'Minimum Spanning Trees', order: 4, description: 'Kruskal and Prim algorithms' },
                            ],
                        },
                        {
                            id: 'cs301-m4',
                            name: 'Sorting and Searching',
                            order: 4,
                            topics: [
                                { id: 'cs301-m4-t1', name: 'Basic Sorting Algorithms', order: 1, description: 'Bubble sort, selection sort, insertion sort' },
                                { id: 'cs301-m4-t2', name: 'Advanced Sorting', order: 2, description: 'Merge sort, quick sort, radix sort' },
                                { id: 'cs301-m4-t3', name: 'Searching Techniques', order: 3, description: 'Linear search, binary search, hashing' },
                                { id: 'cs301-m4-t4', name: 'Algorithm Analysis', order: 4, description: 'Time complexity, space complexity, Big-O notation' },
                            ],
                        },
                    ],
                },
                {
                    id: 'cs302-os',
                    name: 'Operating Systems',
                    code: 'CS302',
                    credits: 4,
                    modules: [
                        {
                            id: 'cs302-m1',
                            name: 'OS Fundamentals',
                            order: 1,
                            topics: [
                                { id: 'cs302-m1-t1', name: 'Introduction to Operating Systems', order: 1, description: 'OS types, functions, system calls' },
                                { id: 'cs302-m1-t2', name: 'Process Management', order: 2, description: 'Process concept, states, PCB, context switching' },
                                { id: 'cs302-m1-t3', name: 'CPU Scheduling', order: 3, description: 'FCFS, SJF, Round Robin, Priority scheduling' },
                                { id: 'cs302-m1-t4', name: 'Process Synchronization', order: 4, description: 'Critical section, semaphores, mutex, deadlock' },
                            ],
                        },
                        {
                            id: 'cs302-m2',
                            name: 'Memory Management',
                            order: 2,
                            topics: [
                                { id: 'cs302-m2-t1', name: 'Memory Allocation', order: 1, description: 'Contiguous allocation, paging, segmentation' },
                                { id: 'cs302-m2-t2', name: 'Virtual Memory', order: 2, description: 'Demand paging, page replacement algorithms' },
                                { id: 'cs302-m2-t3', name: 'File Systems', order: 3, description: 'File organization, directory structure, allocation methods' },
                            ],
                        },
                    ],
                },
                {
                    id: 'cs303-dbms',
                    name: 'Database Management Systems',
                    code: 'CS303',
                    credits: 3,
                    modules: [
                        {
                            id: 'cs303-m1',
                            name: 'Relational Model',
                            order: 1,
                            topics: [
                                { id: 'cs303-m1-t1', name: 'Introduction to DBMS', order: 1, description: 'Database concepts, DBMS architecture, data models' },
                                { id: 'cs303-m1-t2', name: 'ER Model and Design', order: 2, description: 'Entity-relationship diagrams, mapping to relational model' },
                                { id: 'cs303-m1-t3', name: 'SQL Fundamentals', order: 3, description: 'DDL, DML, DCL, aggregate functions, joins' },
                                { id: 'cs303-m1-t4', name: 'Normalization', order: 4, description: '1NF, 2NF, 3NF, BCNF, functional dependencies' },
                            ],
                        },
                        {
                            id: 'cs303-m2',
                            name: 'Transaction Management',
                            order: 2,
                            topics: [
                                { id: 'cs303-m2-t1', name: 'Transaction Concepts', order: 1, description: 'ACID properties, serializability, concurrency control' },
                                { id: 'cs303-m2-t2', name: 'Recovery Systems', order: 2, description: 'Log-based recovery, checkpointing, shadow paging' },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            id: 'sem-4',
            number: 4,
            subjects: [
                {
                    id: 'cs401-cn',
                    name: 'Computer Networks',
                    code: 'CS401',
                    credits: 4,
                    modules: [
                        {
                            id: 'cs401-m1',
                            name: 'Network Fundamentals',
                            order: 1,
                            topics: [
                                { id: 'cs401-m1-t1', name: 'Introduction to Networking', order: 1, description: 'Network types, topologies, OSI and TCP/IP models' },
                                { id: 'cs401-m1-t2', name: 'Data Link Layer', order: 2, description: 'Framing, error detection, flow control, MAC protocols' },
                                { id: 'cs401-m1-t3', name: 'Network Layer', order: 3, description: 'IP addressing, subnetting, routing algorithms' },
                                { id: 'cs401-m1-t4', name: 'Transport Layer', order: 4, description: 'TCP, UDP, congestion control, flow control' },
                            ],
                        },
                    ],
                },
                {
                    id: 'cs402-se',
                    name: 'Software Engineering',
                    code: 'CS402',
                    credits: 3,
                    modules: [
                        {
                            id: 'cs402-m1',
                            name: 'Software Development Lifecycle',
                            order: 1,
                            topics: [
                                { id: 'cs402-m1-t1', name: 'SDLC Models', order: 1, description: 'Waterfall, Agile, Spiral, V-model' },
                                { id: 'cs402-m1-t2', name: 'Requirements Engineering', order: 2, description: 'Requirements elicitation, analysis, specification' },
                                { id: 'cs402-m1-t3', name: 'Software Design', order: 3, description: 'Design patterns, UML diagrams, architectural styles' },
                                { id: 'cs402-m1-t4', name: 'Testing Strategies', order: 4, description: 'Unit, integration, system testing, test case design' },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
}
