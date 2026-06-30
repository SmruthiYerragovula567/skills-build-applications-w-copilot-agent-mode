import { connectDatabase, disconnectDatabase } from '../config/database.js'
import Activity from '../models/activity.js'
import LeaderboardEntry from '../models/leaderboard.js'
import Team from '../models/team.js'
import User from '../models/user.js'
import Workout from '../models/workout.js'

async function seed() {
  console.log('Seed the octofit_db database with test data')

  await connectDatabase()

  await Promise.all([
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    User.deleteMany({}),
    Team.deleteMany({}),
    Workout.deleteMany({}),
  ])

  const teams = await Team.insertMany([
    {
      name: 'Harbor Hustle',
      city: 'Seattle',
      motto: 'Stack consistency, not excuses.',
      points: 1320,
      memberCount: 4,
    },
    {
      name: 'Summit Striders',
      city: 'Denver',
      motto: 'Every climb starts with one rep.',
      points: 1185,
      memberCount: 3,
    },
    {
      name: 'Metro Pulse',
      city: 'Chicago',
      motto: 'Train sharp, recover smarter.',
      points: 1090,
      memberCount: 3,
    },
  ])

  const teamByName = new Map(teams.map((team) => [team.name, team]))

  const users = await User.insertMany([
    {
      name: 'Ava Thompson',
      email: 'ava.thompson@octofit.app',
      goal: 'Build endurance for a fall half marathon.',
      fitnessLevel: 'Intermediate',
      weeklyTarget: 5,
      team: teamByName.get('Harbor Hustle')!._id,
    },
    {
      name: 'Marcus Lee',
      email: 'marcus.lee@octofit.app',
      goal: 'Improve mobility and lower-body strength.',
      fitnessLevel: 'Beginner',
      weeklyTarget: 4,
      team: teamByName.get('Harbor Hustle')!._id,
    },
    {
      name: 'Priya Nair',
      email: 'priya.nair@octofit.app',
      goal: 'Raise cycling power output for weekend races.',
      fitnessLevel: 'Advanced',
      weeklyTarget: 6,
      team: teamByName.get('Summit Striders')!._id,
    },
    {
      name: 'Jonas Meyer',
      email: 'jonas.meyer@octofit.app',
      goal: 'Stay consistent with lunchtime strength sessions.',
      fitnessLevel: 'Intermediate',
      weeklyTarget: 4,
      team: teamByName.get('Metro Pulse')!._id,
    },
  ])

  const userByName = new Map(users.map((user) => [user.name, user]))

  await Activity.insertMany([
    {
      user: userByName.get('Ava Thompson')!._id,
      type: 'Tempo Run',
      durationMinutes: 52,
      caloriesBurned: 610,
      completedAt: new Date('2026-06-27T07:15:00.000Z'),
      notes: 'Held race pace for the middle three miles.',
    },
    {
      user: userByName.get('Marcus Lee')!._id,
      type: 'Mobility Circuit',
      durationMinutes: 35,
      caloriesBurned: 210,
      completedAt: new Date('2026-06-28T18:20:00.000Z'),
      notes: 'Focused on hips, ankles, and core stability.',
    },
    {
      user: userByName.get('Priya Nair')!._id,
      type: 'Intervals Ride',
      durationMinutes: 70,
      caloriesBurned: 820,
      completedAt: new Date('2026-06-29T06:40:00.000Z'),
      notes: 'Five threshold efforts with controlled recovery.',
    },
    {
      user: userByName.get('Jonas Meyer')!._id,
      type: 'Strength Session',
      durationMinutes: 48,
      caloriesBurned: 430,
      completedAt: new Date('2026-06-29T12:10:00.000Z'),
      notes: 'Front squats, rows, presses, and loaded carries.',
    },
  ])

  await LeaderboardEntry.insertMany([
    {
      team: teamByName.get('Harbor Hustle')!._id,
      rank: 1,
      points: 1320,
      weeklyMinutes: 415,
      streakDays: 18,
    },
    {
      team: teamByName.get('Summit Striders')!._id,
      rank: 2,
      points: 1185,
      weeklyMinutes: 392,
      streakDays: 14,
    },
    {
      team: teamByName.get('Metro Pulse')!._id,
      rank: 3,
      points: 1090,
      weeklyMinutes: 351,
      streakDays: 11,
    },
  ])

  await Workout.insertMany([
    {
      title: 'Power Ladder Intervals',
      focus: 'Cardio endurance',
      difficulty: 'Advanced',
      durationMinutes: 45,
      equipment: ['Treadmill', 'Heart-rate monitor'],
      coachTip: 'Keep recoveries easy enough to hold your final two repeats.',
    },
    {
      title: 'Desk Reset Mobility Flow',
      focus: 'Mobility',
      difficulty: 'Beginner',
      durationMinutes: 20,
      equipment: ['Yoga mat'],
      coachTip: 'Move slowly and exhale fully at the end range of each stretch.',
    },
    {
      title: 'Total Body Strength Builder',
      focus: 'Strength',
      difficulty: 'Intermediate',
      durationMinutes: 40,
      equipment: ['Dumbbells', 'Bench'],
      coachTip: 'Use the final set to gauge whether your load should increase next week.',
    },
  ])

  console.log('Seed completed successfully.')
}

void seed()
  .catch((error: unknown) => {
    console.error('Seed failed:', error)
    process.exitCode = 1
  })
  .finally(async () => {
    await disconnectDatabase()
  })