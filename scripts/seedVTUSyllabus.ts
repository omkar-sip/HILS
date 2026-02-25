/**
 * VTU 2022 Scheme – Firestore Seed Script
 *
 * Seeds the official VTU syllabus data into Firestore.
 * Run with: npx tsx scripts/seedVTUSyllabus.ts
 *
 * Firestore path:
 *   universities/{uniId}/branches/{branchId}/semesters/{semId}/
 *     subjects/{subjectId}/modules/{moduleId}/topics/{topicId}
 *
 * This is idempotent – safe to run multiple times (uses set with merge).
 */

import { initializeApp, cert, type ServiceAccount } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { vtuSyllabus } from '../src/shared/data/vtuSyllabus'
import serviceAccount from './serviceAccountKey.json' assert { type: 'json' }

initializeApp({ credential: cert(serviceAccount as ServiceAccount) })
const db = getFirestore()

async function seed() {
    console.log('🌱  Starting VTU syllabus seed...')
    const uniRef = db.collection('universities').doc(vtuSyllabus.id)

    // Seed university root document
    await uniRef.set(
        {
            id: vtuSyllabus.id,
            name: vtuSyllabus.name,
            shortName: vtuSyllabus.shortName,
        },
        { merge: true }
    )

    for (const branch of vtuSyllabus.branches) {
        const branchRef = uniRef.collection('branches').doc(branch.id)
        await branchRef.set(
            { id: branch.id, name: branch.name, shortName: branch.shortName },
            { merge: true }
        )

        for (const semester of branch.semesters) {
            const semRef = branchRef.collection('semesters').doc(semester.id)
            await semRef.set(
                {
                    id: semester.id,
                    number: semester.number,
                    schemeYear: semester.schemeYear,
                },
                { merge: true }
            )

            for (const subject of semester.subjects) {
                const subRef = semRef.collection('subjects').doc(subject.id)
                await subRef.set(
                    {
                        id: subject.id,
                        name: subject.name,
                        code: subject.code,
                        credits: subject.credits,
                        isElective: subject.isElective ?? false,
                        isLab: subject.isLab ?? false,
                    },
                    { merge: true }
                )

                for (const mod of subject.modules) {
                    const modRef = subRef.collection('modules').doc(mod.id)
                    await modRef.set(
                        {
                            id: mod.id,
                            name: mod.name,
                            moduleNumber: mod.moduleNumber,
                            order: mod.order,
                        },
                        { merge: true }
                    )

                    for (const topic of mod.topics) {
                        const topicRef = modRef.collection('topics').doc(topic.id)
                        await topicRef.set(
                            {
                                id: topic.id,
                                name: topic.name,
                                description: topic.description ?? '',
                                order: topic.order,
                            },
                            { merge: true }
                        )
                    }
                }
            }

            console.log(`  ✅  Seeded Semester ${semester.number} (${semester.subjects.length} subjects)`)
        }
    }

    console.log('🎉  VTU syllabus seed complete!')
    process.exit(0)
}

seed().catch((err) => {
    console.error('❌  Seed failed:', err)
    process.exit(1)
})
