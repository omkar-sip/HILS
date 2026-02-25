import type { University } from '@/shared/types/syllabus.types'

// ─── VTU 2022 Scheme – CSE ───
// Official syllabus data. Subject codes, module names and topic breakdowns
// sourced from VTU syllabus documents (2022 scheme, B.E. Computer Science).

export const vtuSyllabus: University = {
    id: 'vtu',
    name: 'Visvesvaraya Technological University',
    shortName: 'VTU',
    branches: [
        {
            id: 'cse',
            name: 'Computer Science & Engineering',
            shortName: 'CSE',
            semesters: [
                // ─────────────────────────────────────────────────
                // SEMESTER 3 – VTU 2022 Scheme
                // ─────────────────────────────────────────────────
                {
                    id: 'vtu-2022-cse-sem3',
                    number: 3,
                    schemeYear: '2022',
                    subjects: [
                        // BCS301 – Mathematics for Computer Science
                        {
                            id: 'BCS301',
                            name: 'Mathematics for Computer Science',
                            code: 'BCS301',
                            credits: 4,
                            modules: [
                                {
                                    id: 'BCS301-M1',
                                    name: 'Propositional & Predicate Logic',
                                    moduleNumber: 1,
                                    order: 1,
                                    topics: [
                                        { id: 'BCS301-M1-T1', name: 'Propositional Logic', order: 1, description: 'Propositions, logical connectives, truth tables, tautologies, contradictions' },
                                        { id: 'BCS301-M1-T2', name: 'Equivalences and Inference', order: 2, description: 'Logical equivalence, laws of logic, rules of inference, valid arguments' },
                                        { id: 'BCS301-M1-T3', name: 'Predicates and Quantifiers', order: 3, description: 'Predicate logic, universal and existential quantifiers, nested quantifiers' },
                                        { id: 'BCS301-M1-T4', name: 'Proof Techniques', order: 4, description: 'Direct proof, proof by contrapositive, proof by contradiction, mathematical induction' },
                                    ],
                                },
                                {
                                    id: 'BCS301-M2',
                                    name: 'Set Theory, Relations & Functions',
                                    moduleNumber: 2,
                                    order: 2,
                                    topics: [
                                        { id: 'BCS301-M2-T1', name: 'Set Theory', order: 1, description: 'Sets, subsets, power set, Cartesian product, Venn diagrams, set operations' },
                                        { id: 'BCS301-M2-T2', name: 'Relations', order: 2, description: 'Binary relations, properties of relations, equivalence relations, partial order' },
                                        { id: 'BCS301-M2-T3', name: 'Functions', order: 3, description: 'Types of functions, composition, inverse, floor and ceiling functions' },
                                        { id: 'BCS301-M2-T4', name: 'Sequences and Summations', order: 4, description: 'Sequences, geometric and arithmetic progressions, summation formulae' },
                                    ],
                                },
                                {
                                    id: 'BCS301-M3',
                                    name: 'Algebraic Structures & Number Theory',
                                    moduleNumber: 3,
                                    order: 3,
                                    topics: [
                                        { id: 'BCS301-M3-T1', name: 'Groups', order: 1, description: 'Binary operations, semigroups, monoids, groups, subgroups, cyclic groups' },
                                        { id: 'BCS301-M3-T2', name: 'Rings and Fields', order: 2, description: 'Rings, integral domains, fields, homomorphisms' },
                                        { id: 'BCS301-M3-T3', name: 'Number Theory', order: 3, description: 'Divisibility, GCD, Euclidean algorithm, primes, modular arithmetic' },
                                        { id: 'BCS301-M3-T4', name: 'Cryptography Basics', order: 4, description: 'RSA, Fermat\'s theorem, Euler\'s theorem, applications in cryptography' },
                                    ],
                                },
                                {
                                    id: 'BCS301-M4',
                                    name: 'Combinatorics',
                                    moduleNumber: 4,
                                    order: 4,
                                    topics: [
                                        { id: 'BCS301-M4-T1', name: 'Counting Principles', order: 1, description: 'Sum and product rules, permutations, combinations, binomial theorem' },
                                        { id: 'BCS301-M4-T2', name: 'Pigeonhole Principle', order: 2, description: 'Pigeonhole principle and applications, inclusion-exclusion principle' },
                                        { id: 'BCS301-M4-T3', name: 'Recurrence Relations', order: 3, description: 'Linear recurrence, solving recurrences, divide-and-conquer recurrences' },
                                        { id: 'BCS301-M4-T4', name: 'Generating Functions', order: 4, description: 'Generating functions, solving counting problems, exponential generating functions' },
                                    ],
                                },
                                {
                                    id: 'BCS301-M5',
                                    name: 'Graph Theory',
                                    moduleNumber: 5,
                                    order: 5,
                                    topics: [
                                        { id: 'BCS301-M5-T1', name: 'Graphs and Representations', order: 1, description: 'Graph terminology, directed and undirected graphs, adjacency matrix/list' },
                                        { id: 'BCS301-M5-T2', name: 'Graph Connectivity', order: 2, description: 'Paths, cycles, connectivity, Euler and Hamiltonian paths/circuits' },
                                        { id: 'BCS301-M5-T3', name: 'Trees', order: 3, description: 'Trees, spanning trees, minimum spanning trees, binary trees' },
                                        { id: 'BCS301-M5-T4', name: 'Graph Coloring & Planarity', order: 4, description: 'Planar graphs, graph coloring, chromatic number, applications' },
                                    ],
                                },
                            ],
                        },
                        // BCS302 – Digital Design & Computer Organization
                        {
                            id: 'BCS302',
                            name: 'Digital Design & Computer Organization',
                            code: 'BCS302',
                            credits: 4,
                            modules: [
                                {
                                    id: 'BCS302-M1',
                                    name: 'Number Systems & Boolean Algebra',
                                    moduleNumber: 1,
                                    order: 1,
                                    topics: [
                                        { id: 'BCS302-M1-T1', name: 'Number Systems', order: 1, description: 'Binary, octal, hexadecimal; conversions, BCD, Gray code' },
                                        { id: 'BCS302-M1-T2', name: 'Boolean Algebra', order: 2, description: 'Boolean laws, De Morgan\'s theorems, canonical forms, SOP and POS' },
                                        { id: 'BCS302-M1-T3', name: 'Karnaugh Maps', order: 3, description: '2, 3, 4 variable K-maps, grouping, minimization, don\'t care conditions' },
                                        { id: 'BCS302-M1-T4', name: 'Logic Gates', order: 4, description: 'Universal gates, NAND/NOR realizations, XOR/XNOR gates' },
                                    ],
                                },
                                {
                                    id: 'BCS302-M2',
                                    name: 'Combinational Logic Circuits',
                                    moduleNumber: 2,
                                    order: 2,
                                    topics: [
                                        { id: 'BCS302-M2-T1', name: 'Adders and Subtractors', order: 1, description: 'Half adder, full adder, half subtractor, full subtractor, carry look-ahead adder' },
                                        { id: 'BCS302-M2-T2', name: 'Multiplexers & Demultiplexers', order: 2, description: 'MUX, DEMUX, implementation of Boolean functions using MUX' },
                                        { id: 'BCS302-M2-T3', name: 'Encoders & Decoders', order: 3, description: 'Priority encoder, BCD to 7-segment decoder, code converters' },
                                        { id: 'BCS302-M2-T4', name: 'Comparators & Code Converters', order: 4, description: 'Magnitude comparators, BCD adder, parity generators' },
                                    ],
                                },
                                {
                                    id: 'BCS302-M3',
                                    name: 'Sequential Logic Circuits',
                                    moduleNumber: 3,
                                    order: 3,
                                    topics: [
                                        { id: 'BCS302-M3-T1', name: 'Flip-Flops', order: 1, description: 'SR, D, JK, T flip-flops; edge-triggered, master-slave configurations' },
                                        { id: 'BCS302-M3-T2', name: 'Registers', order: 2, description: 'Shift registers: SISO, SIPO, PISO, PIPO; universal shift register' },
                                        { id: 'BCS302-M3-T3', name: 'Counters', order: 3, description: 'Ripple counters, synchronous counters, modulus counters, ring and Johnson counters' },
                                        { id: 'BCS302-M3-T4', name: 'Finite State Machines', order: 4, description: 'Moore and Mealy machines, state diagrams, state tables, state minimization' },
                                    ],
                                },
                                {
                                    id: 'BCS302-M4',
                                    name: 'Computer Organization',
                                    moduleNumber: 4,
                                    order: 4,
                                    topics: [
                                        { id: 'BCS302-M4-T1', name: 'Basic Computer Organization', order: 1, description: 'Functional units, bus structure, memory hierarchy, CPU registers' },
                                        { id: 'BCS302-M4-T2', name: 'Instruction Set & Addressing', order: 2, description: 'Instruction formats, addressing modes, instruction cycle, RTL' },
                                        { id: 'BCS302-M4-T3', name: 'ALU Design', order: 3, description: 'Fixed-point arithmetic: addition, subtraction, multiplication (Booth\'s), division' },
                                        { id: 'BCS302-M4-T4', name: 'Floating Point Arithmetic', order: 4, description: 'IEEE 754 standard, floating-point addition, subtraction, multiplication' },
                                    ],
                                },
                                {
                                    id: 'BCS302-M5',
                                    name: 'Memory & I/O Organization',
                                    moduleNumber: 5,
                                    order: 5,
                                    topics: [
                                        { id: 'BCS302-M5-T1', name: 'Memory Organization', order: 1, description: 'RAM, ROM types, cache memory, mapping techniques, write policies' },
                                        { id: 'BCS302-M5-T2', name: 'Virtual Memory', order: 2, description: 'Paging, segmentation, TLB, page replacement algorithms' },
                                        { id: 'BCS302-M5-T3', name: 'I/O Organization', order: 3, description: 'I/O techniques: programmed, interrupt-driven, DMA, I/O interfaces' },
                                        { id: 'BCS302-M5-T4', name: 'Pipeline & Instruction Level Parallelism', order: 4, description: 'Pipelining stages, hazards, data forwarding, super-scalar architecture' },
                                    ],
                                },
                            ],
                        },
                        // BCS303 – Operating Systems
                        {
                            id: 'BCS303',
                            name: 'Operating Systems',
                            code: 'BCS303',
                            credits: 4,
                            modules: [
                                {
                                    id: 'BCS303-M1',
                                    name: 'Introduction to Operating Systems',
                                    moduleNumber: 1,
                                    order: 1,
                                    topics: [
                                        { id: 'BCS303-M1-T1', name: 'OS Overview', order: 1, description: 'OS definition, functions, types: batch, time-sharing, real-time, distributed OS' },
                                        { id: 'BCS303-M1-T2', name: 'OS Structures', order: 2, description: 'Monolithic, layered, microkernel, modular and virtual machine structures' },
                                        { id: 'BCS303-M1-T3', name: 'System Calls & Processes', order: 3, description: 'System calls, process concept, process states, PCB, process operations' },
                                        { id: 'BCS303-M1-T4', name: 'Threads', order: 4, description: 'Threads vs processes, multithreading models, Pthreads, Java threads' },
                                    ],
                                },
                                {
                                    id: 'BCS303-M2',
                                    name: 'Process Scheduling & Synchronization',
                                    moduleNumber: 2,
                                    order: 2,
                                    topics: [
                                        { id: 'BCS303-M2-T1', name: 'CPU Scheduling', order: 1, description: 'Scheduling criteria, FCFS, SJF, Priority, Round Robin; multilevel queue scheduling' },
                                        { id: 'BCS303-M2-T2', name: 'Critical Section Problem', order: 2, description: 'Race conditions, critical section, Peterson\'s solution, hardware synchronization' },
                                        { id: 'BCS303-M2-T3', name: 'Semaphores & Mutexes', order: 3, description: 'Semaphore types, binary and counting; mutex locks; classical sync problems' },
                                        { id: 'BCS303-M2-T4', name: 'Monitors & Classic Problems', order: 4, description: 'Monitors, producer-consumer, readers-writers, dining philosophers problem' },
                                    ],
                                },
                                {
                                    id: 'BCS303-M3',
                                    name: 'Deadlocks',
                                    moduleNumber: 3,
                                    order: 3,
                                    topics: [
                                        { id: 'BCS303-M3-T1', name: 'Deadlock Characterization', order: 1, description: 'Necessary conditions, resource allocation graph, deadlock in multi-threaded apps' },
                                        { id: 'BCS303-M3-T2', name: 'Deadlock Prevention & Avoidance', order: 2, description: 'Prevention strategies, Banker\'s algorithm, safe state concept' },
                                        { id: 'BCS303-M3-T3', name: 'Deadlock Detection & Recovery', order: 3, description: 'Detection algorithms, wait-for graph, recovery by preemption and rollback' },
                                    ],
                                },
                                {
                                    id: 'BCS303-M4',
                                    name: 'Memory Management',
                                    moduleNumber: 4,
                                    order: 4,
                                    topics: [
                                        { id: 'BCS303-M4-T1', name: 'Memory Management Basics', order: 1, description: 'Contiguous allocation, fragmentation, compaction, paging, segmentation' },
                                        { id: 'BCS303-M4-T2', name: 'Virtual Memory', order: 2, description: 'Demand paging, page faults, page replacement algorithms: FIFO, Optimal, LRU' },
                                        { id: 'BCS303-M4-T3', name: 'Thrashing & Working Set', order: 3, description: 'Thrashing, working set model, page fault frequency, memory mapped files' },
                                    ],
                                },
                                {
                                    id: 'BCS303-M5',
                                    name: 'File Systems & I/O Management',
                                    moduleNumber: 5,
                                    order: 5,
                                    topics: [
                                        { id: 'BCS303-M5-T1', name: 'File System Interface', order: 1, description: 'File concept, access methods, directory structures, protection, file sharing' },
                                        { id: 'BCS303-M5-T2', name: 'File System Implementation', order: 2, description: 'File allocation: contiguous, linked, indexed; inode, directory implementation' },
                                        { id: 'BCS303-M5-T3', name: 'I/O Systems', order: 3, description: 'I/O hardware, polling, interrupts, DMA, I/O scheduling: FCFS, SSTF, SCAN, C-SCAN' },
                                        { id: 'BCS303-M5-T4', name: 'Disk Management', order: 4, description: 'Disk structure, disk formatting, RAID levels, storage management' },
                                    ],
                                },
                            ],
                        },
                        // BCS304 – Data Structures and Applications
                        {
                            id: 'BCS304',
                            name: 'Data Structures and Applications',
                            code: 'BCS304',
                            credits: 3,
                            modules: [
                                {
                                    id: 'BCS304-M1',
                                    name: 'Introduction to Data Structures',
                                    moduleNumber: 1,
                                    order: 1,
                                    topics: [
                                        { id: 'BCS304-M1-T1', name: 'Data Structures Overview', order: 1, description: 'Classifications: linear/non-linear, static/dynamic; abstract data types (ADT)' },
                                        { id: 'BCS304-M1-T2', name: 'Arrays', order: 2, description: 'Single and multidimensional arrays, address calculation, sparse matrices' },
                                        { id: 'BCS304-M1-T3', name: 'Structures and Pointers', order: 3, description: 'C structures, self-referential structures, pointer fundamentals, dynamic allocation' },
                                        { id: 'BCS304-M1-T4', name: 'Algorithm Complexity', order: 4, description: 'Time and space complexity, Big-O, Omega, Theta notation, best/worst/average case' },
                                    ],
                                },
                                {
                                    id: 'BCS304-M2',
                                    name: 'Stacks & Queues',
                                    moduleNumber: 2,
                                    order: 2,
                                    topics: [
                                        { id: 'BCS304-M2-T1', name: 'Stack ADT', order: 1, description: 'Stack operations (push, pop, peek), array and linked list implementation' },
                                        { id: 'BCS304-M2-T2', name: 'Stack Applications', order: 2, description: 'Expression evaluation: infix to postfix/prefix conversion, balanced parentheses' },
                                        { id: 'BCS304-M2-T3', name: 'Queue ADT', order: 3, description: 'Queue operations, linear and circular queue, array and linked list implementation' },
                                        { id: 'BCS304-M2-T4', name: 'Queue Variants', order: 4, description: 'Double-ended queue (deque), priority queue, applications of queues' },
                                    ],
                                },
                                {
                                    id: 'BCS304-M3',
                                    name: 'Linked Lists',
                                    moduleNumber: 3,
                                    order: 3,
                                    topics: [
                                        { id: 'BCS304-M3-T1', name: 'Singly Linked List', order: 1, description: 'Node structure, creation, traversal, insertion and deletion operations' },
                                        { id: 'BCS304-M3-T2', name: 'Doubly Linked List', order: 2, description: 'Two-pointer node, bidirectional traversal, insertion and deletion' },
                                        { id: 'BCS304-M3-T3', name: 'Circular Linked List', order: 3, description: 'Singly and doubly circular variants, traversal and operations' },
                                        { id: 'BCS304-M3-T4', name: 'Linked List Applications', order: 4, description: 'Polynomial representation, sparse matrix using linked list, stack/queue using linked list' },
                                    ],
                                },
                                {
                                    id: 'BCS304-M4',
                                    name: 'Trees',
                                    moduleNumber: 4,
                                    order: 4,
                                    topics: [
                                        { id: 'BCS304-M4-T1', name: 'Binary Trees', order: 1, description: 'Terminology, properties, binary tree representation, tree traversals (in, pre, post, level)' },
                                        { id: 'BCS304-M4-T2', name: 'Binary Search Trees', order: 2, description: 'BST properties, search, insertion, deletion, BST traversal and applications' },
                                        { id: 'BCS304-M4-T3', name: 'AVL Trees', order: 3, description: 'Height-balanced BST, balance factor, rotations: LL, RR, LR, RL, insertion with rotations' },
                                        { id: 'BCS304-M4-T4', name: 'Heaps', order: 4, description: 'Min-heap, max-heap, heap operations, heapify, heap sort, priority queue using heap' },
                                    ],
                                },
                                {
                                    id: 'BCS304-M5',
                                    name: 'Graphs, Sorting & Hashing',
                                    moduleNumber: 5,
                                    order: 5,
                                    topics: [
                                        { id: 'BCS304-M5-T1', name: 'Graphs', order: 1, description: 'Graph representation, BFS, DFS, connected components, topological sort' },
                                        { id: 'BCS304-M5-T2', name: 'Sorting Algorithms', order: 2, description: 'Bubble, selection, insertion, merge sort, quick sort; complexity comparison' },
                                        { id: 'BCS304-M5-T3', name: 'Hashing', order: 3, description: 'Hash functions, collision resolution: chaining, open addressing (linear probing, quadratic)' },
                                        { id: 'BCS304-M5-T4', name: 'Searching', order: 4, description: 'Linear search, binary search, interpolation search; search trees overview' },
                                    ],
                                },
                            ],
                        },
                        // BCSL305 – Data Structures Lab
                        {
                            id: 'BCSL305',
                            name: 'Data Structures Lab',
                            code: 'BCSL305',
                            credits: 1,
                            isLab: true,
                            modules: [
                                {
                                    id: 'BCSL305-M1',
                                    name: 'Array & Stack Programs',
                                    moduleNumber: 1,
                                    order: 1,
                                    topics: [
                                        { id: 'BCSL305-M1-T1', name: 'Array Operations', order: 1, description: 'Programs on 1D/2D arrays, searching, sorting using arrays' },
                                        { id: 'BCSL305-M1-T2', name: 'Stack using Array', order: 2, description: 'Push, pop, peek; infix to postfix conversion program' },
                                    ],
                                },
                                {
                                    id: 'BCSL305-M2',
                                    name: 'Queue & Linked List Programs',
                                    moduleNumber: 2,
                                    order: 2,
                                    topics: [
                                        { id: 'BCSL305-M2-T1', name: 'Queue Programs', order: 1, description: 'Linear queue, circular queue implementation in C' },
                                        { id: 'BCSL305-M2-T2', name: 'Linked List Programs', order: 2, description: 'Singly, doubly, circular linked list operations in C' },
                                    ],
                                },
                                {
                                    id: 'BCSL305-M3',
                                    name: 'Tree & Graph Programs',
                                    moduleNumber: 3,
                                    order: 3,
                                    topics: [
                                        { id: 'BCSL305-M3-T1', name: 'BST Programs', order: 1, description: 'Insert, delete, search and traversals on BST' },
                                        { id: 'BCSL305-M3-T2', name: 'Graph Programs', order: 2, description: 'BFS and DFS implementation using adjacency matrix/list' },
                                    ],
                                },
                                {
                                    id: 'BCSL305-M4',
                                    name: 'Sorting & Hashing Programs',
                                    moduleNumber: 4,
                                    order: 4,
                                    topics: [
                                        { id: 'BCSL305-M4-T1', name: 'Sorting Programs', order: 1, description: 'Bubble sort, merge sort, quick sort in C' },
                                        { id: 'BCSL305-M4-T2', name: 'Hashing Programs', order: 2, description: 'Hash table with chaining and linear probing in C' },
                                    ],
                                },
                                {
                                    id: 'BCSL305-M5',
                                    name: 'Mini Project',
                                    moduleNumber: 5,
                                    order: 5,
                                    topics: [
                                        { id: 'BCSL305-M5-T1', name: 'Application Development', order: 1, description: 'Small application using data structures (student records, phone book, etc.)' },
                                    ],
                                },
                            ],
                        },
                        // BCS306x – ESC Elective
                        {
                            id: 'BCS306x',
                            name: 'Engineering Science Course (ESC) Elective',
                            code: 'BCS306x',
                            credits: 3,
                            isElective: true,
                            modules: [
                                {
                                    id: 'BCS306x-M1', name: 'Elective Module 1', moduleNumber: 1, order: 1,
                                    topics: [{ id: 'BCS306x-M1-T1', name: 'ESC Elective Content (varies by choice)', order: 1, description: 'Content depends on chosen elective (e.g., Object Oriented Programming, Python, etc.)' }],
                                },
                                { id: 'BCS306x-M2', name: 'Elective Module 2', moduleNumber: 2, order: 2, topics: [{ id: 'BCS306x-M2-T1', name: 'ESC Elective Module 2', order: 1 }] },
                                { id: 'BCS306x-M3', name: 'Elective Module 3', moduleNumber: 3, order: 3, topics: [{ id: 'BCS306x-M3-T1', name: 'ESC Elective Module 3', order: 1 }] },
                                { id: 'BCS306x-M4', name: 'Elective Module 4', moduleNumber: 4, order: 4, topics: [{ id: 'BCS306x-M4-T1', name: 'ESC Elective Module 4', order: 1 }] },
                                { id: 'BCS306x-M5', name: 'Elective Module 5', moduleNumber: 5, order: 5, topics: [{ id: 'BCS306x-M5-T1', name: 'ESC Elective Module 5', order: 1 }] },
                            ],
                        },
                        // BSCK307 – Social Connect and Responsibility
                        {
                            id: 'BSCK307',
                            name: 'Social Connect and Responsibility',
                            code: 'BSCK307',
                            credits: 1,
                            modules: [
                                { id: 'BSCK307-M1', name: 'Society and Engineering', moduleNumber: 1, order: 1, topics: [{ id: 'BSCK307-M1-T1', name: 'Engineering and Society', order: 1, description: 'Role of engineers in society, social responsibility, ethical dimensions' }] },
                                { id: 'BSCK307-M2', name: 'Community Engagement', moduleNumber: 2, order: 2, topics: [{ id: 'BSCK307-M2-T1', name: 'Community Projects', order: 1, description: 'NSS, community outreach, project-based learning in social context' }] },
                                { id: 'BSCK307-M3', name: 'Sustainability', moduleNumber: 3, order: 3, topics: [{ id: 'BSCK307-M3-T1', name: 'Sustainable Development', order: 1, description: 'Sustainable development goals, environmental responsibility' }] },
                                { id: 'BSCK307-M4', name: 'Professional Ethics', moduleNumber: 4, order: 4, topics: [{ id: 'BSCK307-M4-T1', name: 'Ethics in Engineering', order: 1, description: 'Professional ethics, case studies, IPR basics' }] },
                                { id: 'BSCK307-M5', name: 'Field Activity', moduleNumber: 5, order: 5, topics: [{ id: 'BSCK307-M5-T1', name: 'Field Work & Report', order: 1, description: 'Community activity with report submission' }] },
                            ],
                        },
                        // BCS358x – AEC Elective
                        {
                            id: 'BCS358x',
                            name: 'Ability Enhancement Course (AEC) Elective',
                            code: 'BCS358x',
                            credits: 1,
                            isElective: true,
                            modules: [
                                { id: 'BCS358x-M1', name: 'AEC Module 1', moduleNumber: 1, order: 1, topics: [{ id: 'BCS358x-M1-T1', name: 'AEC Elective Content', order: 1, description: 'Content depends on chosen AEC (e.g., Kannada, Sanskrit, French, etc.)' }] },
                                { id: 'BCS358x-M2', name: 'AEC Module 2', moduleNumber: 2, order: 2, topics: [{ id: 'BCS358x-M2-T1', name: 'AEC Module 2', order: 1 }] },
                                { id: 'BCS358x-M3', name: 'AEC Module 3', moduleNumber: 3, order: 3, topics: [{ id: 'BCS358x-M3-T1', name: 'AEC Module 3', order: 1 }] },
                                { id: 'BCS358x-M4', name: 'AEC Module 4', moduleNumber: 4, order: 4, topics: [{ id: 'BCS358x-M4-T1', name: 'AEC Module 4', order: 1 }] },
                                { id: 'BCS358x-M5', name: 'AEC Module 5', moduleNumber: 5, order: 5, topics: [{ id: 'BCS358x-M5-T1', name: 'AEC Module 5', order: 1 }] },
                            ],
                        },
                    ],
                },
                // ─────────────────────────────────────────────────
                // SEMESTER 4 – VTU 2022 Scheme
                // ─────────────────────────────────────────────────
                {
                    id: 'vtu-2022-cse-sem4',
                    number: 4,
                    schemeYear: '2022',
                    subjects: [
                        // BCS401 – Analysis & Design of Algorithms
                        {
                            id: 'BCS401',
                            name: 'Analysis & Design of Algorithms',
                            code: 'BCS401',
                            credits: 4,
                            modules: [
                                {
                                    id: 'BCS401-M1',
                                    name: 'Introduction to Algorithms & Analysis',
                                    moduleNumber: 1,
                                    order: 1,
                                    topics: [
                                        { id: 'BCS401-M1-T1', name: 'Algorithm Analysis Basics', order: 1, description: 'Algorithm definition, pseudo-code, performance analysis, worst/best/average case' },
                                        { id: 'BCS401-M1-T2', name: 'Asymptotic Notations', order: 2, description: 'Big-O, Omega, Theta notations; properties and examples' },
                                        { id: 'BCS401-M1-T3', name: 'Recurrence Relations', order: 3, description: 'Substitution method, recursion tree, Master theorem and applications' },
                                        { id: 'BCS401-M1-T4', name: 'Searching & Sorting Analysis', order: 4, description: 'Analysis of binary search, merge sort, quick sort; decision trees and lower bounds' },
                                    ],
                                },
                                {
                                    id: 'BCS401-M2',
                                    name: 'Divide and Conquer',
                                    moduleNumber: 2,
                                    order: 2,
                                    topics: [
                                        { id: 'BCS401-M2-T1', name: 'Divide and Conquer Strategy', order: 1, description: 'General method, control abstraction, finding max and min, merge sort' },
                                        { id: 'BCS401-M2-T2', name: 'Quick Sort', order: 2, description: 'Partition scheme, Lomuto/Hoare partition, randomized quick sort, complexity' },
                                        { id: 'BCS401-M2-T3', name: 'Strassen\'s Matrix Multiplication', order: 3, description: 'Matrix multiplication using D&C, Strassen\'s algorithm, complexity comparison' },
                                        { id: 'BCS401-M2-T4', name: 'Binary Search Tree Operations', order: 4, description: 'Optimal BST, D&C applications: closest pair of points, convex hull' },
                                    ],
                                },
                                {
                                    id: 'BCS401-M3',
                                    name: 'Greedy Method',
                                    moduleNumber: 3,
                                    order: 3,
                                    topics: [
                                        { id: 'BCS401-M3-T1', name: 'Greedy Strategy', order: 1, description: 'General greedy approach, greedy choice property, optimal substructure' },
                                        { id: 'BCS401-M3-T2', name: 'Minimum Spanning Trees', order: 2, description: 'Kruskal\'s algorithm, Prim\'s algorithm, correctness proof, complexity' },
                                        { id: 'BCS401-M3-T3', name: 'Shortest Paths', order: 3, description: 'Dijkstra\'s algorithm, single-source shortest path, proof of correctness' },
                                        { id: 'BCS401-M3-T4', name: 'Huffman Coding & Activity Selection', order: 4, description: 'Huffman coding algorithm, activity selection problem, fractional knapsack' },
                                    ],
                                },
                                {
                                    id: 'BCS401-M4',
                                    name: 'Dynamic Programming',
                                    moduleNumber: 4,
                                    order: 4,
                                    topics: [
                                        { id: 'BCS401-M4-T1', name: 'Dynamic Programming Concepts', order: 1, description: 'Principle of optimality, overlapping subproblems, memoization vs tabulation' },
                                        { id: 'BCS401-M4-T2', name: 'Matrix Chain Multiplication', order: 2, description: 'Optimal parenthesization, recurrence, DP table construction' },
                                        { id: 'BCS401-M4-T3', name: 'Longest Common Subsequence', order: 3, description: 'LCS problem, recurrence relation, DP table, reconstruction of LCS' },
                                        { id: 'BCS401-M4-T4', name: 'All Pairs Shortest Path & 0/1 Knapsack', order: 4, description: 'Floyd-Warshall algorithm, 0/1 knapsack DP solution, subset sum problem' },
                                    ],
                                },
                                {
                                    id: 'BCS401-M5',
                                    name: 'Backtracking, Branch & Bound, NP-Completeness',
                                    moduleNumber: 5,
                                    order: 5,
                                    topics: [
                                        { id: 'BCS401-M5-T1', name: 'Backtracking', order: 1, description: 'General method, N-Queens problem, sum of subsets, graph coloring' },
                                        { id: 'BCS401-M5-T2', name: 'Branch and Bound', order: 2, description: 'LC search, FIFO/LIFO branch and bound, 0/1 knapsack, traveling salesman problem' },
                                        { id: 'BCS401-M5-T3', name: 'NP-Completeness', order: 3, description: 'P, NP, NP-Hard, NP-Complete classes, polynomial reducibility, Cook\'s theorem' },
                                        { id: 'BCS401-M5-T4', name: 'NP-Complete Problems', order: 4, description: 'Clique, vertex cover, Hamiltonian cycle, subset sum NP-complete proofs' },
                                    ],
                                },
                            ],
                        },
                        // BCS402 – Microcontrollers
                        {
                            id: 'BCS402',
                            name: 'Microcontrollers',
                            code: 'BCS402',
                            credits: 4,
                            modules: [
                                {
                                    id: 'BCS402-M1',
                                    name: 'Introduction to 8051 Microcontroller',
                                    moduleNumber: 1,
                                    order: 1,
                                    topics: [
                                        { id: 'BCS402-M1-T1', name: '8051 Architecture', order: 1, description: '8051 internal architecture, CPU, memory organization, SFRs, I/O ports' },
                                        { id: 'BCS402-M1-T2', name: 'Memory & I/O', order: 2, description: 'Internal/external memory, program and data memory map, I/O port structure' },
                                        { id: 'BCS402-M1-T3', name: 'Timers & Counters', order: 3, description: 'Timer/Counter modes, TMOD, TCON registers, timer programming' },
                                        { id: 'BCS402-M1-T4', name: 'Serial Communication', order: 4, description: 'UART, serial port modes, SCON, SBUF, baud rate calculation' },
                                    ],
                                },
                                {
                                    id: 'BCS402-M2',
                                    name: '8051 Instruction Set & Programming',
                                    moduleNumber: 2,
                                    order: 2,
                                    topics: [
                                        { id: 'BCS402-M2-T1', name: 'Addressing Modes', order: 1, description: 'Immediate, register, direct, indirect, indexed addressing modes in 8051' },
                                        { id: 'BCS402-M2-T2', name: 'Data Transfer Instructions', order: 2, description: 'MOV, MOVX, MOVC; stack instructions; bit manipulation instructions' },
                                        { id: 'BCS402-M2-T3', name: 'Arithmetic & Logical Instructions', order: 3, description: 'ADD, SUBB, MUL, DIV; AND, OR, XOR, CPL; rotate and swap instructions' },
                                        { id: 'BCS402-M2-T4', name: 'Branch & Subroutine Instructions', order: 4, description: 'Jump, call, return instructions; loop programming; delay routines' },
                                    ],
                                },
                                {
                                    id: 'BCS402-M3',
                                    name: '8051 Interrupts',
                                    moduleNumber: 3,
                                    order: 3,
                                    topics: [
                                        { id: 'BCS402-M3-T1', name: 'Interrupt Structure', order: 1, description: '8051 interrupt sources, IE and IP registers, interrupt enable/priority' },
                                        { id: 'BCS402-M3-T2', name: 'Interrupt Programming', order: 2, description: 'Writing ISRs, external interrupts INT0/INT1, timer interrupts, serial interrupt' },
                                        { id: 'BCS402-M3-T3', name: 'Interrupt Applications', order: 3, description: 'Interrupt-driven serial communication, multi-interrupt handling examples' },
                                    ],
                                },
                                {
                                    id: 'BCS402-M4',
                                    name: 'Interfacing 8051 with Peripherals',
                                    moduleNumber: 4,
                                    order: 4,
                                    topics: [
                                        { id: 'BCS402-M4-T1', name: 'LED & 7-Segment Display', order: 1, description: 'LED interfacing, 7-segment display: static and multiplexed driving' },
                                        { id: 'BCS402-M4-T2', name: 'LCD & Keyboard', order: 2, description: 'LCD interfacing (4-bit and 8-bit), keyboard matrix scanning' },
                                        { id: 'BCS402-M4-T3', name: 'ADC & DAC', order: 3, description: 'ADC0808 interfacing, DAC0808 interfacing, analog signal processing' },
                                        { id: 'BCS402-M4-T4', name: 'Stepper Motor & Serial', order: 4, description: 'Stepper motor interfacing, DC motor control, MAX232 for RS232 communication' },
                                    ],
                                },
                                {
                                    id: 'BCS402-M5',
                                    name: 'ARM Architecture & Embedded Systems',
                                    moduleNumber: 5,
                                    order: 5,
                                    topics: [
                                        { id: 'BCS402-M5-T1', name: 'ARM Architecture Overview', order: 1, description: 'ARM processor family, RISC features, ARM7TDMI, register set, operating modes' },
                                        { id: 'BCS402-M5-T2', name: 'ARM Instruction Set', order: 2, description: 'Data processing, load/store, branch instructions; Thumb instruction set' },
                                        { id: 'BCS402-M5-T3', name: 'Embedded System Design', order: 3, description: 'Embedded system characteristics, RTOS concepts, embedded C programming' },
                                        { id: 'BCS402-M5-T4', name: 'IoT & Applications', order: 4, description: 'IoT architecture, sensors/actuators interface, real-world embedded applications' },
                                    ],
                                },
                            ],
                        },
                        // BCS403 – Database Management Systems
                        {
                            id: 'BCS403',
                            name: 'Database Management Systems',
                            code: 'BCS403',
                            credits: 4,
                            modules: [
                                {
                                    id: 'BCS403-M1',
                                    name: 'Introduction to DBMS & ER Model',
                                    moduleNumber: 1,
                                    order: 1,
                                    topics: [
                                        { id: 'BCS403-M1-T1', name: 'Database Concepts', order: 1, description: 'Database vs file system, DBMS advantages, data abstraction, instances vs schemas' },
                                        { id: 'BCS403-M1-T2', name: 'Database Architecture', order: 2, description: 'Three-schema architecture, data independence, DBMS components, DBA role' },
                                        { id: 'BCS403-M1-T3', name: 'Entity-Relationship Model', order: 3, description: 'Entities, attributes, relationships, ER diagram notation, cardinality, participation' },
                                        { id: 'BCS403-M1-T4', name: 'Extended ER & Mapping', order: 4, description: 'Weak entity, specialization, generalization, aggregation; ER to relational mapping' },
                                    ],
                                },
                                {
                                    id: 'BCS403-M2',
                                    name: 'Relational Model & SQL',
                                    moduleNumber: 2,
                                    order: 2,
                                    topics: [
                                        { id: 'BCS403-M2-T1', name: 'Relational Model', order: 1, description: 'Relational schema, tuples, domains, keys (primary, foreign, candidate, super)' },
                                        { id: 'BCS403-M2-T2', name: 'Relational Algebra', order: 2, description: 'Select, project, join, union, intersection, difference, division operations' },
                                        { id: 'BCS403-M2-T3', name: 'SQL Basics', order: 3, description: 'DDL: CREATE, ALTER, DROP; DML: INSERT, UPDATE, DELETE; SELECT with WHERE, ORDER BY' },
                                        { id: 'BCS403-M2-T4', name: 'Advanced SQL', order: 4, description: 'Joins, aggregate functions, GROUP BY, HAVING, subqueries, views, assertions' },
                                    ],
                                },
                                {
                                    id: 'BCS403-M3',
                                    name: 'Database Design & Normalization',
                                    moduleNumber: 3,
                                    order: 3,
                                    topics: [
                                        { id: 'BCS403-M3-T1', name: 'Functional Dependencies', order: 1, description: 'FD definition, Armstrong\'s axioms, attribute closure, canonical cover, lossless join' },
                                        { id: 'BCS403-M3-T2', name: 'Normal Forms', order: 2, description: '1NF, 2NF, 3NF definitions with examples, anomalies and decomposition' },
                                        { id: 'BCS403-M3-T3', name: 'BCNF & Higher Normal Forms', order: 3, description: 'BCNF, 4NF, 5NF; multi-valued dependencies; decomposition algorithms' },
                                        { id: 'BCS403-M3-T4', name: 'Physical Design', order: 4, description: 'File organization: heap, sequential, hashed, clustered; indexing: B-tree, B+ tree' },
                                    ],
                                },
                                {
                                    id: 'BCS403-M4',
                                    name: 'Transaction Management & Concurrency',
                                    moduleNumber: 4,
                                    order: 4,
                                    topics: [
                                        { id: 'BCS403-M4-T1', name: 'Transactions & ACID', order: 1, description: 'Transaction concept, ACID properties, transaction states, concurrent execution issues' },
                                        { id: 'BCS403-M4-T2', name: 'Serializability', order: 2, description: 'Conflict and view serializability, precedence graphs, testing serializability' },
                                        { id: 'BCS403-M4-T3', name: 'Concurrency Control', order: 3, description: 'Lock-based protocols: 2PL, strict 2PL; timestamp ordering; optimistic concurrency' },
                                        { id: 'BCS403-M4-T4', name: 'Deadlock in DBMS', order: 4, description: 'Deadlock prevention, detection and recovery in databases; wait-for graph' },
                                    ],
                                },
                                {
                                    id: 'BCS403-M5',
                                    name: 'Recovery, NoSQL & Emerging Trends',
                                    moduleNumber: 5,
                                    order: 5,
                                    topics: [
                                        { id: 'BCS403-M5-T1', name: 'Recovery Systems', order: 1, description: 'Failure types, log-based recovery, undo/redo logging, checkpointing, ARIES' },
                                        { id: 'BCS403-M5-T2', name: 'Query Processing & Optimization', order: 2, description: 'Query processing steps, evaluation of relational algebra, query optimization heuristics' },
                                        { id: 'BCS403-M5-T3', name: 'NoSQL Databases', order: 3, description: 'NoSQL types: document, key-value, column-family, graph; MongoDB, CAP theorem' },
                                        { id: 'BCS403-M5-T4', name: 'Big Data & Distributed Databases', order: 4, description: 'Distributed DBMS, fragmentation, replication, big data concepts, Hadoop basics' },
                                    ],
                                },
                            ],
                        },
                        // BCSL404 – ADA Lab
                        {
                            id: 'BCSL404',
                            name: 'Analysis & Design of Algorithms Lab',
                            code: 'BCSL404',
                            credits: 1,
                            isLab: true,
                            modules: [
                                {
                                    id: 'BCSL404-M1', name: 'Sorting & Searching Programs', moduleNumber: 1, order: 1,
                                    topics: [
                                        { id: 'BCSL404-M1-T1', name: 'Sorting Implementations', order: 1, description: 'Merge sort, quick sort with performance analysis in C/C++' },
                                        { id: 'BCSL404-M1-T2', name: 'Searching Programs', order: 2, description: 'Binary search, interpolation search with complexity verification' },
                                    ],
                                },
                                { id: 'BCSL404-M2', name: 'Greedy Programs', moduleNumber: 2, order: 2, topics: [{ id: 'BCSL404-M2-T1', name: 'Greedy Implementations', order: 1, description: "Kruskal's, Prim's, Dijkstra's algorithm programs" }] },
                                { id: 'BCSL404-M3', name: 'DP Programs', moduleNumber: 3, order: 3, topics: [{ id: 'BCSL404-M3-T1', name: 'DP Implementations', order: 1, description: 'Matrix chain, LCS, Floyd-Warshall, 0/1 knapsack programs' }] },
                                { id: 'BCSL404-M4', name: 'Backtracking Programs', moduleNumber: 4, order: 4, topics: [{ id: 'BCSL404-M4-T1', name: 'Backtracking Implementations', order: 1, description: 'N-Queens, graph coloring, Hamiltonian cycle programs' }] },
                                { id: 'BCSL404-M5', name: 'Mini Project', moduleNumber: 5, order: 5, topics: [{ id: 'BCSL404-M5-T1', name: 'Algorithm Application', order: 1, description: 'Real-world application design using studied algorithms' }] },
                            ],
                        },
                        // BCS405x – ESC Elective
                        {
                            id: 'BCS405x',
                            name: 'Engineering Science Course (ESC) Elective',
                            code: 'BCS405x',
                            credits: 3,
                            isElective: true,
                            modules: [
                                { id: 'BCS405x-M1', name: 'ESC Elective Module 1', moduleNumber: 1, order: 1, topics: [{ id: 'BCS405x-M1-T1', name: 'ESC Content', order: 1, description: 'Content depends on chosen ESC elective' }] },
                                { id: 'BCS405x-M2', name: 'ESC Elective Module 2', moduleNumber: 2, order: 2, topics: [{ id: 'BCS405x-M2-T1', name: 'ESC Module 2', order: 1 }] },
                                { id: 'BCS405x-M3', name: 'ESC Elective Module 3', moduleNumber: 3, order: 3, topics: [{ id: 'BCS405x-M3-T1', name: 'ESC Module 3', order: 1 }] },
                                { id: 'BCS405x-M4', name: 'ESC Elective Module 4', moduleNumber: 4, order: 4, topics: [{ id: 'BCS405x-M4-T1', name: 'ESC Module 4', order: 1 }] },
                                { id: 'BCS405x-M5', name: 'ESC Elective Module 5', moduleNumber: 5, order: 5, topics: [{ id: 'BCS405x-M5-T1', name: 'ESC Module 5', order: 1 }] },
                            ],
                        },
                        // BCS456x – AEC Elective
                        {
                            id: 'BCS456x',
                            name: 'Ability Enhancement Course (AEC) Elective',
                            code: 'BCS456x',
                            credits: 1,
                            isElective: true,
                            modules: [
                                { id: 'BCS456x-M1', name: 'AEC Module 1', moduleNumber: 1, order: 1, topics: [{ id: 'BCS456x-M1-T1', name: 'AEC Content', order: 1, description: 'Content depends on chosen AEC' }] },
                                { id: 'BCS456x-M2', name: 'AEC Module 2', moduleNumber: 2, order: 2, topics: [{ id: 'BCS456x-M2-T1', name: 'AEC Module 2', order: 1 }] },
                                { id: 'BCS456x-M3', name: 'AEC Module 3', moduleNumber: 3, order: 3, topics: [{ id: 'BCS456x-M3-T1', name: 'AEC Module 3', order: 1 }] },
                                { id: 'BCS456x-M4', name: 'AEC Module 4', moduleNumber: 4, order: 4, topics: [{ id: 'BCS456x-M4-T1', name: 'AEC Module 4', order: 1 }] },
                                { id: 'BCS456x-M5', name: 'AEC Module 5', moduleNumber: 5, order: 5, topics: [{ id: 'BCS456x-M5-T1', name: 'AEC Module 5', order: 1 }] },
                            ],
                        },
                        // BBOK407 – Biology for Engineers
                        {
                            id: 'BBOK407',
                            name: 'Biology For Engineers',
                            code: 'BBOK407',
                            credits: 3,
                            modules: [
                                { id: 'BBOK407-M1', name: 'Cell Biology', moduleNumber: 1, order: 1, topics: [{ id: 'BBOK407-M1-T1', name: 'Cell Structure & Function', order: 1, description: 'Prokaryotic and eukaryotic cells, cell organelles, cell division' }] },
                                { id: 'BBOK407-M2', name: 'Genetics & Evolution', moduleNumber: 2, order: 2, topics: [{ id: 'BBOK407-M2-T1', name: 'Genetics Basics', order: 1, description: 'DNA, RNA, protein synthesis, Mendelian genetics, mutations' }] },
                                { id: 'BBOK407-M3', name: 'Biomolecules', moduleNumber: 3, order: 3, topics: [{ id: 'BBOK407-M3-T1', name: 'Biological Molecules', order: 1, description: 'Carbohydrates, lipids, proteins, nucleic acids and their engineering applications' }] },
                                { id: 'BBOK407-M4', name: 'Biological Systems & Engineering', moduleNumber: 4, order: 4, topics: [{ id: 'BBOK407-M4-T1', name: 'Bio-Inspired Engineering', order: 1, description: 'Biomimetics, biomedical devices, biosensors, bioinformatics basics' }] },
                                { id: 'BBOK407-M5', name: 'Biotechnology Applications', moduleNumber: 5, order: 5, topics: [{ id: 'BBOK407-M5-T1', name: 'Modern Biotechnology', order: 1, description: 'Recombinant DNA, CRISPR, drug delivery systems, bioinformatics for CS' }] },
                            ],
                        },
                        // BUHK408 – Universal Human Values
                        {
                            id: 'BUHK408',
                            name: 'Universal Human Values Course',
                            code: 'BUHK408',
                            credits: 1,
                            modules: [
                                { id: 'BUHK408-M1', name: 'Introduction to Human Values', moduleNumber: 1, order: 1, topics: [{ id: 'BUHK408-M1-T1', name: 'Value Education Purpose', order: 1, description: 'Need for value-based living, self-exploration, happiness and prosperity' }] },
                                { id: 'BUHK408-M2', name: 'Harmony in Human Beings', moduleNumber: 2, order: 2, topics: [{ id: 'BUHK408-M2-T1', name: 'Self and Body Harmony', order: 1, description: 'Understanding self: needs, feelings, right understanding; harmony within' }] },
                                { id: 'BUHK408-M3', name: 'Harmony in Family & Society', moduleNumber: 3, order: 3, topics: [{ id: 'BUHK408-M3-T1', name: 'Relationships & Feelings', order: 1, description: 'Relationships based on values, universal human order, societal harmony' }] },
                                { id: 'BUHK408-M4', name: 'Harmony with Nature', moduleNumber: 4, order: 4, topics: [{ id: 'BUHK408-M4-T1', name: 'Ecological Balance', order: 1, description: 'Human being as part of nature, sustainable living, co-existence' }] },
                                { id: 'BUHK408-M5', name: 'Professional Ethics', moduleNumber: 5, order: 5, topics: [{ id: 'BUHK408-M5-T1', name: 'Ethics in Profession', order: 1, description: 'Natural acceptance, ethical conduct in professional life, case studies' }] },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
}
