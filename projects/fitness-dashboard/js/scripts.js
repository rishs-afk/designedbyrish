const ALL_WODS={
  build_muscle:{
    MON:{name:"Barbara",format:"5 ROUNDS FOR TIME",duration:"25-35 min",focus:"BODYWEIGHT VOLUME",target:"30:00",score:"Time",note:"3 min rest between rounds. Score is total time including rest.",warmup:[{name:"Jumping Jacks",detail:"50 reps"},{name:"Air Squats",detail:"20 reps"},{name:"Push-ups",detail:"10 reps"},{name:"Cossack Squat",detail:"10 reps each"},{name:"Wrist Circles",detail:"30 sec"}],cooldown:[{name:"Chest Stretch",detail:"45 sec each"},{name:"Pigeon Pose",detail:"60 sec each"},{name:"Forward Fold",detail:"60 sec"},{name:"Cobra Stretch",detail:"45 sec"}],wod:[{move:"Pull-ups",detail:"20 Reps"},{move:"Push-ups",detail:"30 Reps"},{move:"AbMat Sit-ups",detail:"40 Reps"},{move:"Air Squats",detail:"50 Reps"}]},
    TUE:{name:"Chelsea",format:"EMOM 30",duration:"30 min",focus:"PULL/PUSH/SQUAT",target:"30 Rounds",score:"Rounds",note:"Every minute on the minute for 30 min. If you fall behind, continue as AMRAP.",warmup:[{name:"Burpees",detail:"10 reps"},{name:"Scapular Pull-ups",detail:"15 reps"},{name:"Shoulder Pass-throughs",detail:"15 reps"},{name:"Glute Bridges",detail:"20 reps"}],cooldown:[{name:"Lat Stretch",detail:"45 sec each"},{name:"Child's Pose",detail:"90 sec"},{name:"Thread the Needle",detail:"45 sec each"}],wod:[{move:"Pull-ups",detail:"5 Reps"},{move:"Push-ups",detail:"10 Reps"},{move:"Air Squats",detail:"15 Reps"}]},
    WED:{name:"DT",format:"5 ROUNDS FOR TIME",duration:"10-15 min",focus:"BARBELL STRENGTH",target:"12:00",score:"Time",note:"Weight: 155/105 lbs. Focus on unbroken sets if possible.",warmup:[{name:"PVC Leg Swings",detail:"10 each"},{name:"Empty Bar Deadlifts",detail:"15 reps"},{name:"Empty Bar Hang Cleans",detail:"10 reps"},{name:"Empty Bar Push Press",detail:"10 reps"}],cooldown:[{name:"Hamstring Stretch",detail:"60 sec each"},{name:"Prayer Stretch (Lats)",detail:"60 sec"},{name:"Wrist Stretch",detail:"45 sec each"}],wod:[{move:"Deadlifts",detail:"12 Reps"},{move:"Hang Power Cleans",detail:"9 Reps"},{move:"Push Jerks",detail:"6 Reps"}]},
    THU:{name:"Hellen",format:"3 ROUNDS FOR TIME",duration:"8-12 min",focus:"MONOSTRUCTURAL + KBS",target:"10:00",score:"Time",note:"Run 400m, 21 KBS 24/16kg, 12 Pull-ups.",warmup:[{name:"Jog 400m",detail:"Easy"},{name:"KBS (light)",detail:"20 reps"},{name:"Active Hang",detail:"30 sec"},{name:"Hip Mobility",detail:"3 min"}],cooldown:[{name:"Calf Stretch",detail:"45 sec each"},{name:"Quad Stretch",detail:"45 sec each"},{name:"Hamstring Stretch",detail:"60 sec each"}],wod:[{move:"Run",detail:"400 Meters"},{move:"Kettlebell Swings",detail:"21 Reps"},{move:"Pull-ups",detail:"12 Reps"}]},
    FRI:{name:"The Chief",format:"5 x 3 MIN AMRAP",duration:"19 min total",focus:"CORE/STRENGTH",target:"20 Rounds",score:"Rounds",note:"1 min rest between AMRAPs. Start each 3 min where you left off.",warmup:[{name:"Bear Crawl",detail:"20m"},{name:"Air Squats",detail:"20 reps"},{name:"Cobra to Down Dog",detail:"10 reps"},{name:"Wall Slides",detail:"15 reps"}],cooldown:[{name:"Cobra Stretch",detail:"60 sec"},{name:"Cat-Cow",detail:"12 reps"},{name:"Child's Pose",detail:"60 sec"}],wod:[{move:"Power Cleans (135/95)",detail:"3 Reps"},{move:"Push-ups",detail:"6 Reps"},{move:"Air Squats",detail:"9 Reps"}]},
    SAT:{name:"Fight Gone Bad",format:"3 ROUNDS",duration:"17 min",focus:"METABOLIC CONDITIONING",target:"300 Reps",score:"Total Reps",note:"1 min per station. 1 min rest between rounds. Moves: Wall Ball, SDHP, Box Jump, Push Press, Row.",warmup:[{name:"Jump Rope",detail:"2 min"},{name:"Samson Stretch",detail:"30 sec each"},{name:"Deep Squat Hold",detail:"60 sec"},{name:"Scorpion Stretch",detail:"10 each"}],cooldown:[{name:"Full Body Roll",detail:"5 min"},{name:"Hamstring Stretch",detail:"60 sec each"},{name:"Child's Pose",detail:"60 sec"}],wod:[{move:"Wall Balls",detail:"1 min reps"},{move:"Sumo Deadlift High Pulls",detail:"1 min reps"},{move:"Box Jumps (20\")",detail:"1 min reps"},{move:"Push Press (75/55)",detail:"1 min reps"},{move:"Row (Calories)",detail:"1 min reps"}]},
  },
  lose_fat:{}, // placeholder for other goals
  endurance:{},
  maintain:{},
};

const ALL_WEEK_PLANS={
  build_muscle:[
    {day:"MON",label:"PUSH",color:"#e8453c",warmup:[{name:"Arm Circles",detail:"30 sec each"},{name:"Band Pull-Aparts",detail:"20 reps"},{name:"Push-up to Down Dog",detail:"10 reps"},{name:"Wrist Circles",detail:"30 sec"},{name:"Shoulder Taps",detail:"20 reps"}],cooldown:[{name:"Chest Wall Stretch",detail:"45 sec each"},{name:"Cross-Body Shoulder Stretch",detail:"45 sec each"},{name:"Tricep Overhead Stretch",detail:"30 sec each"},{name:"Child's Pose",detail:"60 sec"},{name:"Eagle Arms",detail:"30 sec each"}],main:[{name:"Bench Press",sets:"4",reps:"8-10"},{name:"Overhead Press",sets:"3",reps:"10-12"},{name:"Incline DB Bench",sets:"3",reps:"10-12"},{name:"Lateral Raises",sets:"4",reps:"15-20"},{name:"Tricep Pushdowns",sets:"3",reps:"12-15"},{name:"Skull Crushers",sets:"3",reps:"10-12"}],extras:[{name:"Machine Flyes",sets:"3",reps:"15-20",tag:"CHEST FINISHER"},{name:"Dips",sets:"3",reps:"AMRAP",tag:"CHEST FINISHER"}],core:{focus:"ANTI-EXTENSION",exercises:[{name:"Dead Bug",sets:"3",reps:"12 each"},{name:"Plank with Weight",sets:"3",reps:"60 sec"},{name:"Ab Wheel Rollout",sets:"3",reps:"10-12"}]}},
    {day:"TUE",label:"PULL",color:"#059669",warmup:[{name:"Scapular Pull-ups",detail:"12 reps"},{name:"Cat-Cow",detail:"15 reps"},{name:"Dead Hang",detail:"45 sec"},{name:"Band Face Pulls",detail:"20 reps"},{name:"World's Greatest Stretch",detail:"5 each"}],cooldown:[{name:"Lat Stretch",detail:"60 sec each"},{name:"Bicep Wall Stretch",detail:"45 sec each"},{name:"Upper Trap Stretch",detail:"30 sec each"},{name:"Supine Twist",detail:"60 sec each"},{name:"Thoracic Bridge",detail:"5 each"}],main:[{name:"Weighted Pull-ups",sets:"4",reps:"6-8"},{name:"Barbell Row",sets:"4",reps:"8-10"},{name:"Seated Cable Row",sets:"3",reps:"10-12"},{name:"Face Pulls",sets:"3",reps:"15-20"},{name:"Barbell Bicep Curl",sets:"3",reps:"10-12"},{name:"Hammer Curls",sets:"3",reps:"12-15"}],extras:[{name:"Reverse Flyes",sets:"3",reps:"15-20",tag:"REAR DELT"},{name:"Single-Arm Lat Pulldown",sets:"3",reps:"12-15",tag:"LAT WIDTH"}],core:{focus:"ANTI-ROTATION",exercises:[{name:"Pallof Press",sets:"3",reps:"12 each"},{name:"Russian Twist",sets:"3",reps:"20 each"},{name:"Bird Dog",sets:"3",reps:"12 each"}]}},
    {day:"WED",label:"LEGS",color:"#ef6b5a",warmup:[{name:"Assault Bike",detail:"3 min easy"},{name:"Leg Swings",detail:"15 each"},{name:"Hip Circles",detail:"15 each"},{name:"BW Squats",detail:"20 reps"},{name:"Glute Bridges",detail:"20 reps"}],cooldown:[{name:"Quad Stretch",detail:"45 sec each"},{name:"Hamstring Stretch",detail:"60 sec each"},{name:"Pigeon Pose",detail:"60 sec each"},{name:"Calf Stretch",detail:"45 sec each"},{name:"Couch Stretch",detail:"60 sec each"}],main:[{name:"Back Squat",sets:"4",reps:"8-10"},{name:"Romanian Deadlift",sets:"4",reps:"10-12"},{name:"Leg Press",sets:"3",reps:"12-15"},{name:"Leg Extensions",sets:"3",reps:"15-20"},{name:"Lying Leg Curls",sets:"3",reps:"12-15"},{name:"Standing Calf Raises",sets:"4",reps:"15-20"}],extras:[{name:"Hip Abduction Machine",sets:"3",reps:"15-20",tag:"GLUTE MED"},{name:"Walking Lunges",sets:"3",reps:"20 steps",tag:"GLUTES"}],core:{focus:"POSTERIOR CHAIN",exercises:[{name:"Reverse Hyper",sets:"3",reps:"15"},{name:"Hanging Leg Raises",sets:"3",reps:"10-15"},{name:"Weighted Back Ext",sets:"3",reps:"12"}]}},
    {day:"THU",label:"PUSH",color:"#e8453c",warmup:[{name:"Band Pull-aparata",detail:"20 reps"},{name:"Push-ups",detail:"15 reps"},{name:"Thread the Needle",detail:"10 each"},{name:"Shoulder Circles",detail:"30 sec"},{name:"Y-T-W",detail:"10 sets"}],cooldown:[{name:"Chest Stretch",detail:"45 sec each"},{name:"Tricep Stretch",detail:"30 sec each"},{name:"Neck Stretch",detail:"30 sec each"},{name:"Child's Pose",detail:"60 sec"},{name:"Sphinx Pose",detail:"60 sec"}],main:[{name:"Incline DB Bench",sets:"4",reps:"8-10"},{name:"Dips (Weighted)",sets:"3",reps:"10-12"},{name:"Cable Flyes",sets:"3",reps:"12-15"},{name:"Arnold Press",sets:"3",reps:"10-12"},{name:"Tricep Extensions",sets:"3",reps:"15"},{name:"Lateral Raises",sets:"4",reps:"15"}],extras:[{name:"Landmine Press",sets:"3",reps:"12 each",tag:"SHOULDERS"},{name:"Close Grip Bench",sets:"3",reps:"10-12",tag:"TRICEPS"}],core:{focus:"LOWER ABS",exercises:[{name:"V-Ups",sets:"3",reps:"15"},{name:"Mountain Climbers",sets:"3",reps:"30 total"},{name:"Hollow Hold",sets:"3",reps:"45 sec"}]}},
    {day:"FRI",label:"PULL",color:"#059669",warmup:[{name:"Scapular Pull-ups",detail:"10 reps"},{name:"Band Face Pulls",detail:"20 reps"},{name:"Dead Hang",detail:"30 sec"},{name:"Cat-Cow",detail:"10 reps"},{name:"Wrist Stretch",detail:"30 sec each"}],cooldown:[{name:"Lat Stretch",detail:"45 sec each"},{name:"Seated Forward Fold",detail:"45 sec"},{name:"Bicep Wall Stretch",detail:"30 sec each"},{name:"Supine Twist",detail:"45 sec each"},{name:"Child's Pose",detail:"60 sec"}],main:[{name:"Rack Pull / Trap Bar DL",sets:"3",reps:"5-6"},{name:"Chest-Supported Row",sets:"4",reps:"10-12"},{name:"Single-Arm DB Row",sets:"3",reps:"12 each"},{name:"Straight-Arm Pulldown",sets:"3",reps:"12-15"},{name:"Reverse Flyes",sets:"3",reps:"15-20"},{name:"Incline DB Curl",sets:"3",reps:"12-15"},{name:"Cable Curl",sets:"3",reps:"12-15"}],extras:[{name:"Adductor Machine",sets:"3",reps:"15-20",tag:"ADDUCTORS"},{name:"Sumo RDL",sets:"3",reps:"12-15",tag:"ADDUCTORS"}],core:{focus:"ROTATIONAL / SERRATUS",exercises:[{name:"Ab Wheel Rollout",sets:"3",reps:"10-12"},{name:"Landmine Rotation",sets:"3",reps:"12 each"},{name:"Plank with Reach",sets:"3",reps:"10 each"}]}},
    {day:"SAT",label:"LEGS",color:"#ef6b5a",warmup:[{name:"Assault Bike / Row",detail:"3 min easy"},{name:"Leg Swings",detail:"10 each"},{name:"Hip 90/90",detail:"30 sec each"},{name:"BW Split Squat",detail:"10 each"},{name:"Glute Bridge Hold",detail:"3x5 sec"}],cooldown:[{name:"Quad Stretch",detail:"30 sec each"},{name:"Hamstring Stretch",detail:"45 sec each"},{name:"Pigeon Pose",detail:"60 sec each"},{name:"Calf Stretch",detail:"30 sec each"},{name:"Child's Pose",detail:"90 sec"}],main:[{name:"Front/Hack Squat",sets:"4",reps:"8-10"},{name:"Stiff-Leg Deadlift",sets:"4",reps:"10-12"},{name:"Bulgarian Split Squat",sets:"3",reps:"10 each"},{name:"Leg Extension",sets:"3",reps:"15-20"},{name:"Seated Leg Curl",sets:"3",reps:"12-15"},{name:"Seated Calf Raise",sets:"4",reps:"15-20"}],extras:[{name:"Hip Abduction Machine",sets:"3",reps:"15-20",tag:"GLUTE MED"},{name:"Banded Lateral Walk",sets:"3",reps:"15 each",tag:"GLUTE MED"}],core:{focus:"FULL CORE FINISHER",exercises:[{name:"Hanging Leg Raise",sets:"3",reps:"10-15"},{name:"Cable Crunch",sets:"3",reps:"15-20"},{name:"Weighted Plank",sets:"3",reps:"45 sec"}]}},
  ],
  lose_fat:[
    {day:"MON",label:"CIRCUIT",color:"#e8453c",warmup:[{name:"Jump Rope 3 min",detail:""},{name:"Leg Swings",detail:"10 each"},{name:"Arm Circles",detail:"30 sec"},{name:"Hip Circles",detail:"10 each"}],cooldown:[{name:"Walk 3 min",detail:""},{name:"Full body stretch",detail:"8 min"}],main:[{name:"DB Squat to Press",sets:"4",reps:"15-20"},{name:"Dumbbell Row",sets:"4",reps:"15 each"},{name:"Push-ups",sets:"4",reps:"20"},{name:"Reverse Lunges",sets:"3",reps:"15 each"},{name:"Lat Pulldown",sets:"3",reps:"15-20"}],extras:[{name:"Jump Rope",sets:"3",reps:"60 sec",tag:"CARDIO"},{name:"Battle Ropes",sets:"3",reps:"30 sec",tag:"CARDIO"}],core:{focus:"FAT BURN CORE",exercises:[{name:"Plank",sets:"3",reps:"45 sec"},{name:"Mountain Climbers",sets:"3",reps:"20 fast"},{name:"Bicycle Crunch",sets:"3",reps:"20 each"}]}},
    {day:"TUE",label:"HIIT GYM",color:"#059669",warmup:[{name:"Row 3 min",detail:"Easy"},{name:"Hip mobility",detail:"5 min"},{name:"Activation",detail:"2 min"}],cooldown:[{name:"Walk 5 min",detail:""},{name:"Stretch",detail:"8 min"}],main:[{name:"Treadmill Intervals",sets:"8",reps:"30s sprint / 30s walk"},{name:"Stairmaster",sets:"1",reps:"10 min steady"},{name:"KB Swings",sets:"4",reps:"20"},{name:"Box Jumps",sets:"4",reps:"15"},{name:"Rowing Machine",sets:"3",reps:"500m"}],extras:[{name:"Sled Push",sets:"4",reps:"20m",tag:"FINISHER"},{name:"Burpees",sets:"3",reps:"15",tag:"FINISHER"}],core:{focus:"METABOLIC CORE",exercises:[{name:"V-Ups",sets:"3",reps:"15"},{name:"Leg Raises",sets:"3",reps:"15"},{name:"Plank Holds",sets:"3",reps:"40 sec"}]}},
    {day:"WED",label:"UPPER",color:"#ef6b5a",warmup:[{name:"Band pull-aparts",detail:"20 reps"},{name:"Arm circles",detail:"30 sec"},{name:"Light row",detail:"2 min"}],cooldown:[{name:"Chest stretch",detail:"45 sec"},{name:"Lat stretch",detail:"45 sec each"},{name:"Child's pose",detail:"60 sec"}],main:[{name:"Pull-ups / Assisted",sets:"4",reps:"12-15"},{name:"DB Bench Press",sets:"4",reps:"12-15"},{name:"Cable Row",sets:"3",reps:"15-20"},{name:"Shoulder Press",sets:"3",reps:"15"},{name:"Face Pulls",sets:"3",reps:"20"}],extras:[{name:"Tricep Dips",sets:"3",reps:"15",tag:"ARMS"},{name:"Bicep Curl",sets:"3",reps:"15-20",tag:"ARMS"}],core:{focus:"UPPER CORE",exercises:[{name:"Dead Bug",sets:"3",reps:"10 each"},{name:"Ab Wheel",sets:"3",reps:"10"},{name:"Hollow Hold",sets:"3",reps:"30 sec"}]}},
    {day:"THU",label:"LOWER",color:"#e8453c",warmup:[{name:"Bike 5 min",detail:"Easy"},{name:"Leg swings",detail:"10 each"},{name:"Glute bridges",detail:"15 reps"}],cooldown:[{name:"Quad stretch",detail:"45 sec each"},{name:"Pigeon pose",detail:"60 sec each"},{name:"Calf stretch",detail:"30 sec"}],main:[{name:"Goblet Squat",sets:"4",reps:"15-20"},{name:"Romanian Deadlift",sets:"4",reps:"15"},{name:"Leg Press",sets:"3",reps:"20"},{name:"Step-ups",sets:"3",reps:"15 each"},{name:"Lying Leg Curl",sets:"3",reps:"15-20"}],extras:[{name:"Hip Abduction",sets:"3",reps:"20",tag:"GLUTES"},{name:"Calf Raises",sets:"3",reps:"25",tag:"CALVES"}],core:{focus:"LOWER CORE",exercises:[{name:"Hanging Knee Raise",sets:"3",reps:"15"},{name:"Cable Crunch",sets:"3",reps:"20"},{name:"Plank",sets:"3",reps:"45 sec"}]}},
    {day:"FRI",label:"FULL",color:"#059669",warmup:[{name:"Jump rope 2 min",detail:""},{name:"Dynamic warm-up",detail:"5 min"},{name:"Activation",detail:"2 min"}],cooldown:[{name:"Walk 5 min",detail:""},{name:"Full stretch",detail:"10 min"}],main:[{name:"Barbell Squat",sets:"3",reps:"15"},{name:"Push-ups",sets:"3",reps:"20"},{name:"DB Row",sets:"3",reps:"15 each"},{name:"Shoulder Press",sets:"3",reps:"15"},{name:"RDL",sets:"3",reps:"15"}],extras:[{name:"Treadmill",sets:"1",reps:"20 min Zone 2",tag:"CARDIO"},{name:"Rowing",sets:"1",reps:"2000m",tag:"CARDIO"}],core:{focus:"CIRCUIT CORE",exercises:[{name:"Bicycle Crunch",sets:"3",reps:"20 each"},{name:"Mountain Climbers",sets:"3",reps:"30 fast"},{name:"Side Plank",sets:"2",reps:"30 sec each"}]}},
    {day:"SAT",label:"CARDIO",color:"#ef6b5a",warmup:[{name:"Walk 5 min",detail:""},{name:"Dynamic stretch",detail:"5 min"},{name:"Easy jog 400m",detail:""}],cooldown:[{name:"Walk 10 min",detail:""},{name:"Full stretch",detail:"15 min"}],main:[{name:"Stairmaster",sets:"1",reps:"20 min"},{name:"Treadmill Incline Walk",sets:"1",reps:"15 min"},{name:"Rowing Machine",sets:"1",reps:"2000m"},{name:"Cycling",sets:"1",reps:"10 min easy"}],extras:[{name:"Jump Rope",sets:"5",reps:"60 sec",tag:"FINISHER"},{name:"Battle Ropes",sets:"4",reps:"30 sec",tag:"FINISHER"}],core:{focus:"ABS FINISHER",exercises:[{name:"Crunches",sets:"3",reps:"25"},{name:"Leg Raises",sets:"3",reps:"15"},{name:"Plank",sets:"3",reps:"60 sec"}]}},
  ],
  endurance:[
    {day:"MON",label:"BASE",color:"#e8453c",warmup:[{name:"Easy jog 800m",detail:""},{name:"Dynamic stretches",detail:"5 min"},{name:"Strides x 4",detail:"60m"}],cooldown:[{name:"Walk 5 min",detail:""},{name:"Calf + ham stretch",detail:"5 min"}],main:[{name:"Treadmill Zone 2 Run",sets:"1",reps:"30 min"},{name:"Rowing Machine",sets:"1",reps:"2000m easy"},{name:"Step-ups",sets:"3",reps:"15 each"},{name:"Single-leg RDL",sets:"3",reps:"10 each"},{name:"Calf Raises",sets:"4",reps:"20"}],extras:[{name:"Box Step-ups",sets:"3",reps:"10 each",tag:"ENDURANCE"},{name:"Incline Walk",sets:"1",reps:"10 min",tag:"ENDURANCE"}],core:{focus:"RUNNER CORE",exercises:[{name:"Dead Bug",sets:"3",reps:"10 each"},{name:"Bird Dog",sets:"3",reps:"12 each"},{name:"Plank",sets:"3",reps:"45 sec"}]}},
    {day:"TUE",label:"STRENGTH",color:"#059669",warmup:[{name:"Mobility circuit",detail:"5 min"},{name:"Activation band work",detail:"3 min"},{name:"Easy movement",detail:"2 min"}],cooldown:[{name:"Full stretch",detail:"10 min"},{name:"Foam roll",detail:"5 min"}],main:[{name:"Barbell Squat",sets:"4",reps:"6-8"},{name:"Deadlift",sets:"3",reps:"5"},{name:"Pull-ups",sets:"4",reps:"6-8"},{name:"Push Press",sets:"4",reps:"6-8"},{name:"Single-leg Press",sets:"3",reps:"10 each"}],extras:[{name:"Hip Thrust",sets:"3",reps:"12",tag:"GLUTES"},{name:"Nordic Curl",sets:"3",reps:"8",tag:"HAMSTRINGS"}],core:{focus:"STABILITY",exercises:[{name:"Pallof Press",sets:"3",reps:"12 each"},{name:"Copenhagen Plank",sets:"3",reps:"20 sec"},{name:"Suitcase Carry",sets:"3",reps:"30m each"}]}},
    {day:"WED",label:"EASY",color:"#ef6b5a",warmup:[{name:"Walk 5 min",detail:""},{name:"Easy jog",detail:"5 min"},{name:"Light mobility",detail:"5 min"}],cooldown:[{name:"Walk 5 min",detail:""},{name:"Full stretch",detail:"10 min"}],main:[{name:"Easy Run",sets:"1",reps:"30-40 min Zone 2"},{name:"Cycling easy",sets:"1",reps:"20 min"},{name:"Walking lunges",sets:"3",reps:"20 total"},{name:"Calf raises",sets:"3",reps:"25"}],extras:[{name:"Yoga flow",sets:"1",reps:"15 min",tag:"RECOVERY"},{name:"Foam rolling",sets:"1",reps:"10 min",tag:"RECOVERY"}],core:{focus:"LIGHT CORE",exercises:[{name:"Cat-cow",sets:"2",reps:"10"},{name:"Bird dog",sets:"2",reps:"10 each"},{name:"Glute bridge",sets:"2",reps:"15"}]}},
    {day:"THU",label:"POWER",color:"#e8453c",warmup:[{name:"Jog 600m",detail:""},{name:"Drills",detail:"5 min"},{name:"Strides x 4",detail:"85%"}],cooldown:[{name:"Jog easy 400m",detail:""},{name:"Stretch",detail:"10 min"}],main:[{name:"Track Intervals",sets:"6",reps:"400m at 90%"},{name:"Box Jumps",sets:"4",reps:"10"},{name:"Power Cleans (light)",sets:"4",reps:"5"},{name:"Jump Lunges",sets:"3",reps:"10 each"},{name:"Sprint Drills",sets:"4",reps:"30m"}],extras:[{name:"Banded sprint",sets:"4",reps:"20m",tag:"POWER"},{name:"Broad jumps",sets:"4",reps:"5",tag:"POWER"}],core:{focus:"POWER CORE",exercises:[{name:"Med Ball Slam",sets:"3",reps:"10"},{name:"Rotational throw",sets:"3",reps:"10 each"},{name:"Plank",sets:"3",reps:"45 sec"}]}},
    {day:"FRI",label:"CROSS",color:"#059669",warmup:[{name:"Row easy 3 min",detail:""},{name:"Bike easy 3 min",detail:""},{name:"Mobility",detail:"5 min"}],cooldown:[{name:"Easy swim / walk",detail:"5 min"},{name:"Full stretch",detail:"10 min"}],main:[{name:"Rowing Machine",sets:"1",reps:"3000m steady"},{name:"Cycling",sets:"1",reps:"20 min Z2"},{name:"Swimming",sets:"1",reps:"500m easy"},{name:"Elliptical",sets:"1",reps:"15 min"}],extras:[{name:"Incline Walk",sets:"1",reps:"10 min",tag:"CARDIO"},{name:"Easy Bike",sets:"1",reps:"10 min",tag:"CARDIO"}],core:{focus:"ENDURANCE CORE",exercises:[{name:"Plank",sets:"3",reps:"60 sec"},{name:"Side plank",sets:"2",reps:"40 sec each"},{name:"Dead bug",sets:"3",reps:"10 each"}]}},
    {day:"SAT",label:"LONG",color:"#ef6b5a",warmup:[{name:"Walk 10 min",detail:""},{name:"Easy jog 5 min",detail:""},{name:"Gradual build",detail:"5 min"}],cooldown:[{name:"Walk 10 min",detail:"Critical"},{name:"Stretch 15 min",detail:""},{name:"Refuel immediately",detail:""}],main:[{name:"Long Run",sets:"1",reps:"60-90 min Zone 2"},{name:"Every 20 min: form check",detail:"Stay relaxed",sets:"1",reps:"—"},{name:"Final 5 min: build to Z3",sets:"1",reps:"—"}],extras:[{name:"Post-run walk",sets:"1",reps:"10 min",tag:"RECOVERY"},{name:"Ice bath optional",sets:"1",reps:"10 min",tag:"RECOVERY"}],core:{focus:"POST-RUN CORE",exercises:[{name:"Glute bridge",sets:"2",reps:"15"},{name:"Clamshells",sets:"2",reps:"15 each"},{name:"Light plank",sets:"2",reps:"30 sec"}]}},
  ],
  maintain:[
    {day:"MON",label:"PUSH",color:"#e8453c",warmup:[{name:"Arm Circles",detail:"30 sec each"},{name:"Band Pull-Aparts",detail:"20 reps"},{name:"Push-up to Down Dog",detail:"10 reps"},{name:"Wrist Circles",detail:"30 sec"}],cooldown:[{name:"Chest stretch",detail:"45 sec"},{name:"Shoulder stretch",detail:"30 sec each"},{name:"Child's pose",detail:"60 sec"}],main:[{name:"Bench Press",sets:"3",reps:"8-10"},{name:"Overhead Press",sets:"3",reps:"8-10"},{name:"Incline DB Press",sets:"3",reps:"10-12"},{name:"Lateral Raises",sets:"3",reps:"12-15"},{name:"Tricep Pushdown",sets:"3",reps:"12-15"}],extras:[{name:"Cable Flyes",sets:"2",reps:"12-15",tag:"CHEST"},{name:"OH Tricep Extension",sets:"2",reps:"12-15",tag:"TRICEPS"}],core:{focus:"STABILITY",exercises:[{name:"Plank",sets:"3",reps:"45 sec"},{name:"Pallof Press",sets:"2",reps:"12 each"},{name:"Dead Bug",sets:"2",reps:"10 each"}]}},
    {day:"TUE",label:"PULL",color:"#059669",warmup:[{name:"Scapular pull-ups",detail:"10 reps"},{name:"Band face pulls",detail:"20 reps"},{name:"Dead hang",detail:"30 sec"},{name:"Cat-cow",detail:"10 reps"}],cooldown:[{name:"Lat stretch",detail:"45 sec each"},{name:"Bicep wall stretch",detail:"30 sec each"},{name:"Supine twist",detail:"45 sec each"}],main:[{name:"Pull-ups",sets:"3",reps:"8-10"},{name:"Barbell Row",sets:"3",reps:"8-10"},{name:"Cable Row",sets:"3",reps:"12-15"},{name:"Face Pulls",sets:"3",reps:"15-20"},{name:"DB Curl",sets:"3",reps:"12-15"}],extras:[{name:"Hammer Curl",sets:"2",reps:"12-15",tag:"BICEPS"},{name:"Reverse Flyes",sets:"2",reps:"15",tag:"REAR DELT"}],core:{focus:"DEEP CORE",exercises:[{name:"Bird Dog",sets:"3",reps:"12 each"},{name:"Hollow Hold",sets:"3",reps:"25 sec"},{name:"Ab Wheel",sets:"2",reps:"8"}]}},
    {day:"WED",label:"LEGS",color:"#ef6b5a",warmup:[{name:"Bike 5 min",detail:""},{name:"Leg swings",detail:"10 each"},{name:"Hip circles",detail:"10 each"},{name:"BW squats",detail:"15"}],cooldown:[{name:"Quad stretch",detail:"30 sec each"},{name:"Pigeon pose",detail:"45 sec each"},{name:"Calf stretch",detail:"30 sec each"}],main:[{name:"Barbell Squat",sets:"3",reps:"8-10"},{name:"Romanian Deadlift",sets:"3",reps:"10-12"},{name:"Leg Press",sets:"3",reps:"12-15"},{name:"Leg Curl",sets:"3",reps:"12-15"},{name:"Calf Raises",sets:"3",reps:"15-20"}],extras:[{name:"Walking Lunges",sets:"2",reps:"12 each",tag:"GLUTES"},{name:"Hip Abduction",sets:"2",reps:"15",tag:"GLUTES"}],core:{focus:"OBLIQUES",exercises:[{name:"Side Plank",sets:"2",reps:"35 sec each"},{name:"Russian Twist",sets:"3",reps:"15 each"},{name:"Bicycle Crunch",sets:"3",reps:"15 each"}]}},
    {day:"THU",label:"CARDIO",color:"#e8453c",warmup:[{name:"Easy walk",detail:"5 min"},{name:"Dynamic stretch",detail:"5 min"}],cooldown:[{name:"Walk",detail:"5 min"},{name:"Stretch",detail:"8 min"}],main:[{name:"Run or Bike",sets:"1",reps:"30 min Zone 2"},{name:"Rowing Machine",sets:"1",reps:"2000m"},{name:"Step-ups",sets:"3",reps:"15 each"},{name:"Bodyweight circuit",sets:"2",reps:"10 min"}],extras:[{name:"Jump Rope",sets:"3",reps:"60 sec",tag:"CARDIO"},{name:"Box Jumps",sets:"3",reps:"10",tag:"POWER"}],core:{focus:"FUNCTIONAL",exercises:[{name:"Plank",sets:"3",reps:"40 sec"},{name:"Mountain Climbers",sets:"2",reps:"20"},{name:"Glute Bridge",sets:"3",reps:"15"}]}},
    {day:"FRI",label:"FULL",color:"#059669",warmup:[{name:"Jump rope 2 min",detail:""},{name:"Full body mobility",detail:"5 min"}],cooldown:[{name:"Full stretch",detail:"10 min"}],main:[{name:"Deadlift",sets:"3",reps:"6-8"},{name:"Bench Press",sets:"3",reps:"8-10"},{name:"Pull-ups",sets:"3",reps:"8"},{name:"Shoulder Press",sets:"3",reps:"10"},{name:"Squat",sets:"3",reps:"10"}],extras:[{name:"Dips",sets:"2",reps:"12",tag:"PUSH"},{name:"Curls",sets:"2",reps:"12",tag:"PULL"}],core:{focus:"FULL CORE",exercises:[{name:"Hanging Knee Raise",sets:"3",reps:"12"},{name:"Plank",sets:"2",reps:"45 sec"},{name:"Russian Twist",sets:"2",reps:"15 each"}]}},
    {day:"SAT",label:"ACTIVE",color:"#ef6b5a",warmup:[{name:"Easy walk/jog",detail:"5 min"},{name:"Mobility",detail:"5 min"}],cooldown:[{name:"Full stretch",detail:"10 min"}],main:[{name:"Light Jog",sets:"1",reps:"20-30 min"},{name:"Swimming",sets:"1",reps:"20 min easy"},{name:"Cycling",sets:"1",reps:"20 min easy"}],extras:[{name:"Yoga",sets:"1",reps:"20 min",tag:"RECOVERY"},{name:"Foam Rolling",sets:"1",reps:"10 min",tag:"RECOVERY"}],core:{focus:"LIGHT CORE",exercises:[{name:"Cat-cow",sets:"2",reps:"10"},{name:"Glute bridge",sets:"2",reps:"15"},{name:"Child's pose",detail:"60 sec"}]}},
  ],
};

function getWODs(){return ALL_WODS[S.goal]||ALL_WODS.build_muscle;}
function getWeekPlan(){return ALL_WEEK_PLANS[S.goal]||ALL_WEEK_PLANS.build_muscle;}

const DEFAULT_SCHEDULES={
  build_muscle:{MON:{morning:'crossfit',evening:'gym'},TUE:{morning:'crossfit',evening:'gym'},WED:{morning:'crossfit',evening:'gym'},THU:{morning:'crossfit',evening:'gym'},FRI:{morning:'crossfit',evening:'gym'},SAT:{morning:'none',evening:'gym'},SUN:{morning:'none',evening:'rest'}},
  lose_fat:    {MON:{morning:'run',    evening:'gym'}, TUE:{morning:'run',    evening:'gym'}, WED:{morning:'run',    evening:'gym'}, THU:{morning:'run',    evening:'gym'}, FRI:{morning:'run',    evening:'gym'}, SAT:{morning:'none',  evening:'gym'}, SUN:{morning:'none',evening:'rest'}},
  endurance:   {MON:{morning:'run',    evening:'gym'}, TUE:{morning:'none',   evening:'gym'}, WED:{morning:'run',    evening:'none'},THU:{morning:'run',    evening:'gym'}, FRI:{morning:'none',   evening:'gym'}, SAT:{morning:'run',   evening:'none'},SUN:{morning:'none',evening:'rest'}},
  maintain:    {MON:{morning:'none',   evening:'gym'}, TUE:{morning:'none',   evening:'gym'}, WED:{morning:'none',   evening:'gym'}, THU:{morning:'run',    evening:'none'},FRI:{morning:'none',   evening:'gym'}, SAT:{morning:'none',  evening:'gym'}, SUN:{morning:'none',evening:'rest'}},
};
const meals=[
  {time:"7:00 AM",label:"BREAKFAST",mealIcon:"egg",items:["4 eggs scrambled + 2 whites","2 slices sourdough toast","1 cup oats w/ banana & honey","Black coffee or green tea"],macros:{p:45,c:80,f:20,kcal:680}},
  {time:"10:30 AM",label:"MID-MORNING",mealIcon:"nut",items:["Greek yogurt (200g)","30g mixed nuts","1 apple"],macros:{p:20,c:30,f:15,kcal:330}},
  {time:"1:00 PM",label:"LUNCH",mealIcon:"chicken",items:["200g grilled chicken","1.5 cups rice / quinoa","Mixed salad w/ olive oil","1 cup steamed broccoli"],macros:{p:55,c:70,f:15,kcal:640}},
  {time:"3:30 PM",label:"PRE-WORKOUT",mealIcon:"bolt",items:["1 banana","2 rice cakes + PB","Whey shake (30g protein)"],macros:{p:35,c:55,f:10,kcal:460}},
  {time:"7:00 PM",label:"POST-WORKOUT",mealIcon:"meat",items:["200g lean beef / salmon","1.5 cups sweet potato / pasta","Roasted vegetables","Olive oil drizzle"],macros:{p:50,c:75,f:18,kcal:666}},
  {time:"9:30 PM",label:"EVENING",mealIcon:"moon",items:["Cottage cheese (200g)","1 tbsp almond butter","Casein protein (optional)"],macros:{p:30,c:10,f:12,kcal:264}}
];
// trackers are now dynamic via getTrackers() based on goal + profile
const dayLabels={MON:"PUSH",TUE:"PULL",WED:"LEGS",THU:"PUSH",FRI:"PULL",SAT:"LEGS",SUN:"REST"};
const dayColors={MON:"#e8453c",TUE:"#059669",WED:"#ef6b5a",THU:"#e8453c",FRI:"#059669",SAT:"#ef6b5a",SUN:"rgba(30,41,59,0.3)"};
const DAY_KEYS=["SUN","MON","TUE","WED","THU","FRI","SAT"];
const DAY_LABELS_FULL=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const MONTH_NAMES=["January","February","March","April","May","June","July","August","September","October","November","December"];

function getTodayKey(){return DAY_KEYS[new Date().getDay()]}
function getWeekNumber(){const d=new Date();d.setHours(0,0,0,0);d.setDate(d.getDate()+3-(d.getDay()+6)%7);const w=new Date(d.getFullYear(),0,4);return 1+Math.round(((d-w)/86400000-(3-(w.getDay()+6)%7))/7)}
function getDateSubtitle(){const n=new Date();return`${DAY_LABELS_FULL[n.getDay()].toUpperCase()}, ${n.getDate()} ${MONTH_NAMES[n.getMonth()].toUpperCase()} · WEEK ${getWeekNumber()}`}
function getGreeting(){const h=new Date().getHours();return h<12?'Good morning':h<17?'Good afternoon':'Good evening'}

const todayKey=getTodayKey();
const allDays=[{s:"MON",l:"PUSH"},{s:"TUE",l:"PULL"},{s:"WED",l:"LEGS"},{s:"THU",l:"PUSH"},{s:"FRI",l:"PULL"},{s:"SAT",l:"LEGS"},{s:"SUN",l:"REST"}].map(d=>({...d,today:d.s===todayKey}));

function dayKey(day,k){return`${day}_${k}`}
function getDayChecks(day,k){return S.checks[dayKey(day,k)]||{}}
function setDayChecks(day,k,val){S.checks={...S.checks,[dayKey(day,k)]:val};saveState()}

const DEFAULT_SCHEDULE={
  MON:{morning:'crossfit', evening:'gym'},
  TUE:{morning:'crossfit', evening:'gym'},
  WED:{morning:'crossfit', evening:'gym'},
  THU:{morning:'crossfit', evening:'gym'},
  FRI:{morning:'crossfit', evening:'gym'},
  SAT:{morning:'none',     evening:'gym'},
  SUN:{morning:'none',     evening:'rest'},
};

let S={tab:"today",activeDay:todayKey,session:"morning",weekDay:todayKey,weekSession:"morning",checks:{},trk:{0:0,1:0,2:0,3:0},wodScores:{},measurements:[],customWorkouts:[],streakDays:{},
  profile:{weight:80,height:178,age:28,sex:"male",units:"metric"},
  goal:"build_muscle",
  weekSchedule:JSON.parse(JSON.stringify(DEFAULT_SCHEDULE)),
  scheduleEditing:false,
};
const SAVE_KEY='fittrack_v6';
const PERSIST_KEYS=['checks','trk','activeDay','session','tab','wodScores','measurements','customWorkouts','streakDays','profile','goal','weekSchedule'];
function saveState(){try{const o={};PERSIST_KEYS.forEach(k=>{o[k]=S[k]});localStorage.setItem(SAVE_KEY,JSON.stringify(o))}catch(e){}}
function loadState(){try{const raw=localStorage.getItem(SAVE_KEY);if(!raw)return;const saved=JSON.parse(raw);PERSIST_KEYS.forEach(k=>{if(saved[k]!==undefined)S[k]=saved[k]})}catch(e){}}
function set(u){
  if(u.goal && u.goal!==S.goal){
    // Apply the goal's default schedule when switching goals
    u.weekSchedule=JSON.parse(JSON.stringify(DEFAULT_SCHEDULES[u.goal]||DEFAULT_SCHEDULES.build_muscle));
  }
  Object.assign(S,u);saveState();render();
}
function togC(k,key){const d=getDayChecks(S.activeDay,k);setDayChecks(S.activeDay,k,{...d,[key]:!d[key]});render()}
function togSet(key){const d=getDayChecks(S.activeDay,'cSets');setDayChecks(S.activeDay,'cSets',{...d,[key]:!d[key]});render()}
function adjTrk(i,d){const t=getTrackers()[i];const raw=Math.round((S.trk[i]+d)*10)/10;S.trk={...S.trk,[i]:Math.max(0,Math.min(t.target,raw))};saveState();render()}

// ── GOALS CONFIG ────────────────────────────────────────────────────────────
const GOALS={
  build_muscle:{label:"Build Muscle",emoji:"💪",desc:"Caloric surplus, high protein, strength focus",activityMult:1.55,surplusKcal:300,proteinPerKg:2.2,carbPct:0.45,fatPct:0.25},
  lose_fat:    {label:"Lose Fat",   emoji:"🔥",desc:"Caloric deficit, preserve muscle, cardio mix",activityMult:1.45,surplusKcal:-400,proteinPerKg:2.4,carbPct:0.35,fatPct:0.28},
  endurance:   {label:"Endurance",  emoji:"🏃",desc:"Higher carbs, moderate protein, aerobic base",activityMult:1.65,surplusKcal:100,proteinPerKg:1.6,carbPct:0.55,fatPct:0.22},
  maintain:    {label:"Maintain",   emoji:"⚖️",desc:"Balanced macros, body recomposition",activityMult:1.5,surplusKcal:0,proteinPerKg:1.8,carbPct:0.40,fatPct:0.30},
};

// Mifflin-St Jeor BMR → TDEE → macros
function calcNutrition(){
  const p=S.profile;
  const wKg=p.units==='imperial'?p.weight*0.453592:p.weight;
  const hCm=p.units==='imperial'?p.height*2.54:p.height;
  const bmr=p.sex==='female'
    ?(10*wKg)+(6.25*hCm)-(5*p.age)-161
    :(10*wKg)+(6.25*hCm)-(5*p.age)+5;
  const g=GOALS[S.goal]||GOALS.build_muscle;
  const tdee=Math.round(bmr*g.activityMult);
  const kcal=Math.round(tdee+g.surplusKcal);
  const protein=Math.round(wKg*g.proteinPerKg);
  const fatKcal=kcal*g.fatPct;
  const fats=Math.round(fatKcal/9);
  const carbKcal=kcal-(protein*4)-(fats*9);
  const carbs=Math.round(Math.max(carbKcal,0)/4);
  return{kcal,protein,carbs,fats,tdee};
}

function getTrackers(){
  const n=calcNutrition();
  return[
    {label:"STEPS",unit:`/ 10k`,trkIcon:"steps",target:10000,color:"#059669",inc:1000,fmt:v=>v>=1000?(v/1000).toFixed(1)+'k':v},
    {label:"WATER",unit:"glasses / 8",trkIcon:"water",target:8,color:"#3b82f6",inc:1,fmt:v=>v},
    {label:"PROTEIN",unit:`g / ${n.protein}`,trkIcon:"protein",target:n.protein,color:"#e8453c",inc:10,fmt:v=>v},
    {label:"SLEEP",unit:"hrs / 8",trkIcon:"sleep",target:8,color:"#f59080",inc:0.5,fmt:v=>v},
  ];
}

// ── Streak ──────────────────────────────────────────────────────────────────
function todayDateStr(){const n=new Date();return`${n.getFullYear()}-${n.getMonth()+1}-${n.getDate()}`}
function markStreakDay(){S.streakDays={...S.streakDays,[todayDateStr()]:true};saveState()}
function calcStreak(){let s=0;const d=new Date();for(let i=0;i<365;i++){const k=`${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;if(S.streakDays[k])s++;else if(i>0)break;d.setDate(d.getDate()-1);}return s;}

// Generate heatmap data: last 12 weeks x 7 days
function getHeatmapData(){
  const cells=[];
  const today=new Date();
  // go back 83 days to fill 12 cols of 7
  const start=new Date(today);
  start.setDate(start.getDate()-83);
  for(let i=0;i<84;i++){
    const d=new Date(start);d.setDate(d.getDate()+i);
    const k=`${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
    const isToday=d.toDateString()===today.toDateString();
    const active=!!S.streakDays[k];
    cells.push({active,isToday});
  }
  return cells;
}

// ── WOD scores ─────────────────────────────────────────────────────────────
function saveWodScore(day,score){S.wodScores={...S.wodScores,[day]:[...(S.wodScores[day]||[]),{score,date:new Date().toLocaleDateString()}]};saveState();render()}

// ── Measurements ────────────────────────────────────────────────────────────
function saveMeasurement(entry){S.measurements=[...S.measurements,{...entry,date:new Date().toLocaleDateString()}];saveState();render()}
function latestMeasurement(){return S.measurements.length?S.measurements[S.measurements.length-1]:null}
function prevMeasurement(){return S.measurements.length>1?S.measurements[S.measurements.length-2]:null}
function trendArrow(curr,prev,lb=false){if(!prev)return'';const diff=curr-prev;if(Math.abs(diff)<0.1)return'<span style="color:var(--text3)">→</span>';const good=(diff>0&&!lb)||(diff<0&&lb);return`<span style="color:${good?'#34D399':'#FF6464'}">${diff>0?'↑':'↓'}</span>`}

// ── Custom workouts ─────────────────────────────────────────────────────────
function saveCustomWorkout(w){S.customWorkouts=[...S.customWorkouts,w];saveState();render()}
function deleteCustomWorkout(i){S.customWorkouts=S.customWorkouts.filter((_,idx)=>idx!==i);saveState();render()}

// ── SVG Icons ───────────────────────────────────────────────────────────────
const SVGS={
  dash:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  today:'<path d="M12 2v4m0 12v4m-7.07-3.93l2.83-2.83m8.48-8.48l2.83-2.83M2 12h4m12 0h4m-3.93 7.07l-2.83-2.83M7.76 7.76L4.93 4.93"/><circle cx="12" cy="12" r="4"/>',
  week:'<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
  meals:'<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2"/><line x1="7" y1="2" x2="7" y2="22"/><path d="M21 2v20"/><path d="M21 8c0-3-2-6-5-6v6c0 1.1.9 2 2 2h3z"/>',
  track:'<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
  build:'<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
  check:'<polyline points="20 6 9 17 4 12"/>',
  fire:'<path d="M12 2c0 6-6 8-6 14a6 6 0 0012 0c0-6-6-8-6-14z"/><path d="M12 12c0 3-2 4-2 6a2 2 0 004 0c0-2-2-3-2-6z"/>',
  target:'<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  sleep:'<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>',
  steps:'<path d="M13 4v4l3 3-3 3v4"/><path d="M5 4v4l3 3-3 3v4"/>',
  water:'<path d="M12 2L5.5 9.5a8 8 0 1013 0L12 2z"/>',
  protein:'<path d="M12 2a5 5 0 015 5c0 2.5-2 4.5-2 7H9c0-2.5-2-4.5-2-7a5 5 0 015-5z"/><line x1="9" y1="22" x2="15" y2="22"/><line x1="10" y1="18" x2="14" y2="18"/>',
  dumbbell:'<path d="M6 4v16"/><path d="M18 4v16"/><line x1="6" y1="12" x2="18" y2="12"/><rect x="2" y="7" width="4" height="10" rx="1"/><rect x="18" y="7" width="4" height="10" rx="1"/>',
  wod:'<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  egg:'<path d="M12 2C9 2 5 6 5 11a7 7 0 0014 0C19 6 15 2 12 2z"/>',
  nut:'<path d="M12 2a9 9 0 100 20A9 9 0 0012 2z"/><path d="M12 8v4l3 3"/>',
  chicken:'<path d="M20 9V7a2 2 0 00-2-2h-2V3H8v2H6a2 2 0 00-2 2v2a4 4 0 000 8h1v3h10v-3h1a4 4 0 000-8z"/>',
  bolt:'<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  meat:'<path d="M15 11v5a2 2 0 01-2 2H7a2 2 0 01-2-2V8a2 2 0 012-2h2"/><path d="M15 5h4a2 2 0 012 2v8a2 2 0 01-2 2h-4"/>',
  moon:'<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>',
  ruler:'<path d="M21.3 15.3a2.4 2.4 0 010 3.4L17 23l-5-5 8.6-8.6a2.4 2.4 0 013.4 0z"/><path d="M2.7 8.7a2.4 2.4 0 010-3.4L7 1l5 5L3.4 14.6a2.4 2.4 0 01-3.4 0z"/>',
  camera:'<path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/>',
  chart:'<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
  scale:'<circle cx="12" cy="5" r="3"/><path d="M6.5 8a6.5 6.5 0 1011 0"/><line x1="12" y1="8" x2="12" y2="22"/>',
  energy:'<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  timer:'<circle cx="12" cy="13" r="8"/><polyline points="12 9 12 13 14 15"/><line x1="9" y1="2" x2="15" y2="2"/>',
};
function svgIcon(name,size=16,stroke='currentColor'){return`<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="${stroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${SVGS[name]||''}</svg>`}
function icon(n){return`<svg viewBox="0 0 24 24">${SVGS[n]||SVGS.build}</svg>`}
function tag(t,c='t-a'){return`<span class="tag ${c}">${t}</span>`}
function sec(t,c='var(--accent)'){return`<div class="sec"><div class="sec-bar" style="background:${c}"></div><span class="sec-text">${t}</span></div>`}

// ── Sidebar & Nav ───────────────────────────────────────────────────────────
function renderSidebar(){
  const tabs=[{id:"today",label:"Today",ic:"today"},{id:"week",label:"Week Plan",ic:"week"},{id:"meals",label:"Nutrition",ic:"meals"},{id:"track",label:"Track",ic:"track"},{id:"build",label:"Build",ic:"build"},{id:"goals",label:"Goals & Profile",ic:"target"}];
  const streak=calcStreak();
  const g=GOALS[S.goal]||GOALS.build_muscle;
  const n=calcNutrition();
  document.getElementById('sidebar').innerHTML=`
    <div class="logo"><div class="logo-icon">${svgIcon('dumbbell',18,'#000')}</div><div class="logo-text">FIT<span>TRACK</span></div></div>
    <div class="sidebar-section">MENU</div>
    ${tabs.map(t=>`<button class="nav-btn ${S.tab===t.id?'active':''}" onclick="set({tab:'${t.id}'})">${icon(t.ic)}${t.label}</button>`).join('')}
    <div class="sidebar-footer">
      <div class="sidebar-profile-card">
        <div class="sidebar-profile-card-inner">
          <div class="sidebar-streak-lbl">Current streak</div>
          <div class="sidebar-streak-row">
            <div class="sidebar-streak-num">${streak}</div>
            <div class="sidebar-streak-unit">days</div>
          </div>
          <div class="sidebar-divider"></div>
          <div class="sidebar-goal-row">
            <div>
              <div class="sidebar-goal-name">${g.emoji} ${g.label}</div>
              <div class="sidebar-goal-meta">~${n.protein}g protein · ~${n.kcal.toLocaleString()} kcal</div>
            </div>
            <div class="sidebar-goal-badge" onclick="set({tab:'goals'})" style="cursor:pointer">EDIT</div>
          </div>
        </div>
      </div>
    </div>`;
}
function renderMobNav(){
  const tabs=[{id:"dash",label:"HOME",ic:"dash"},{id:"today",label:"TODAY",ic:"today"},{id:"week",label:"WEEK",ic:"week"},{id:"meals",label:"MEALS",ic:"meals"},{id:"track",label:"TRACK",ic:"track"},{id:"goals",label:"GOALS",ic:"target"}];
  document.getElementById('mobnav').innerHTML=tabs.map(t=>`<button class="mob-btn ${S.tab===t.id?'active':''}" onclick="set({tab:'${t.id}'})">${icon(t.ic)}${t.label}</button>`).join('');
}

// ── Workout components ──────────────────────────────────────────────────────
function checkIcon(){return`<svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="#000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`}
function chkItem(item,key,sk){
  const d=getDayChecks(S.activeDay,sk)[key];
  return`<div class="neo-flat ani"><div class="chk ${d?'done':''}" onclick="togC('${sk}','${key}')">
    <div class="chk-c ${d?'done':''}">${d?checkIcon():''}</div>
    <div><div class="chk-name">${item.name}</div><div class="chk-det">${item.detail}</div></div>
  </div></div>`;
}
function dottedRing(done,total,color){
  const R=20,cx=26,cy=26,size=52;
  const circ=2*Math.PI*R;
  const pct=total>0?done/total:0;
  const dash=circ*pct;
  const gap=circ-dash;
  const trackArc=`<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="rgba(30,41,59,0.08)" stroke-width="3.5"/>`;
  const progressArc=done>0
    ?`<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${color}" stroke-width="3.5"
        stroke-dasharray="${dash.toFixed(2)} ${gap.toFixed(2)}"
        stroke-dashoffset="${(circ/4).toFixed(2)}"
        stroke-linecap="round"
        style="transition:stroke-dasharray 0.3s ease"/>`
    :'';
  return`<svg class="ring-svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">${trackArc}${progressArc}</svg>`;
}
function exRow(ex,pfx,idx,color){
  const n=parseInt(ex.sets);
  const checks=getDayChecks(S.activeDay,'cSets');
  let doneSets=0,setDots='';
  for(let s=0;s<n;s++){
    const k=`${pfx}-${idx}-${s}`;const d=checks[k];
    if(d)doneSets++;
    setDots+=`<button class="set-dot ${d?'done':''}" onclick="togSet('${k}')">${s+1}</button>`;
  }
  const allDone=doneSets===n;
  const pct=n>0?Math.round(doneSets/n*100):0;

  // Parse reps for display (e.g. "8-10", "12 each", "30 sec")
  const repsLabel=ex.reps||'';
  // Rest time — infer from reps range: heavy = longer rest
  const repsNum=parseInt(repsLabel)||12;
  const rest=ex.rest||(repsNum<=6?'3 min':repsNum<=10?'2 min':repsNum<=15?'90 sec':'60 sec');

  return`<div class="ex-card ani" style="${allDone?'opacity:0.4':''}">
    <div class="ex-card-inner">
      <div class="ex-ring-wrap">${dottedRing(doneSets,n,color)}
        <div class="ex-ring-center">
          <div class="ex-ring-done" style="color:${allDone?'var(--text3)':color};font-size:16px">${doneSets}</div>
        </div>
      </div>
      <div class="ex-info">
        <div class="ex-name" style="${allDone?'text-decoration:line-through;color:var(--text3)':''}">${ex.name}${ex.tag?` <span class="tag t-m">${ex.tag}</span>`:''}</div>
        <div class="ex-meta">${ex.sets} sets · ${repsLabel}</div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:5px;flex-shrink:0">
        <span class="tag" style="background:${color}15;color:${allDone?'var(--text3)':color}">${doneSets}/${n}</span>
        <span class="ex-detail-pill">🔁 ${repsLabel}</span>
        <span class="ex-detail-pill">⏱ ${rest}</span>
      </div>
    </div>
    <div class="ex-sets-row">${setDots}</div>
  </div>`;
}
function wodMove(m,i){
  const k=`wod-${i}`;const d=getDayChecks(S.activeDay,'cWod')[k];
  return`<div class="neo-flat ani"><div class="wod-mv ${d?'done':''}" onclick="togC('cWod','${k}')">
    <div class="wod-mv-n">${i+1}</div>
    <div><div style="font-weight:700;font-size:13px">${m.move}</div><div style="font-size:11px;color:var(--text3);margin-top:1px">${m.detail}</div></div>
  </div></div>`;
}
// ── SESSION TYPES ────────────────────────────────────────────────────────────
const SESSION_TYPES={
  crossfit:{icon:'⚡',label:'CrossFit',   color:'#e8453c'},
  gym:     {icon:'🏋️',label:'Gym',        color:'#ef6b5a'},
  run:     {icon:'🏃',label:'Run',         color:'#059669'},
  yoga:    {icon:'🧘',label:'Yoga',        color:'#3b82f6'},
  rest:    {icon:'😴',label:'Rest',        color:'rgba(30,41,59,0.3)'},
  none:    {icon:'—', label:'Off',         color:'rgba(30,41,59,0.2)'},
};

function getDaySchedule(day){
  return(S.weekSchedule&&S.weekSchedule[day])||{morning:'none',evening:'rest'};
}
function getActiveSessions(day){
  const sc=getDaySchedule(day);
  const slots=[];
  if(sc.morning&&sc.morning!=='none')slots.push({slot:'morning',type:sc.morning});
  if(sc.evening&&sc.evening!=='none'&&sc.evening!=='rest')slots.push({slot:'evening',type:sc.evening});
  if(slots.length===0)slots.push({slot:'evening',type:'rest'});
  return slots;
}

function sessionToggle(f){
  const day=S.activeDay;
  const sessions=getActiveSessions(day);
  if(sessions.length<=1&&sessions[0]?.type==='rest')return'';
  return`<div class="session-pills">${sessions.map(({slot,type})=>{
    const st=SESSION_TYPES[type]||SESSION_TYPES.rest;
    const active=S[f]===slot;
    return`<button class="session-pill ${active?'active':''}" onclick="set({${f}:'${slot}'})">
      <span class="session-pill-icon">${st.icon}</span>
      <span class="session-pill-text">${slot.toUpperCase()} · ${st.label.toUpperCase()}</span>
    </button>`;
  }).join('')}</div>`;
}

// ── RUN SESSION ──────────────────────────────────────────────────────────────
function renderRun(day,slot){
  const key=`run_${day}_${slot}`;
  const log=S.checks[key]||{};
  const inpS=`class="run-log-inp"`;
  return`<div class="run-card ani">
    <div style="font-size:9px;font-weight:700;letter-spacing:2px;color:var(--text3);margin-bottom:4px">${slot.toUpperCase()} RUN</div>
    <div style="font-size:22px;font-weight:800;color:var(--accent);margin-bottom:12px">🏃 Today's Run</div>
    <div class="run-stat-grid">
      <div class="run-stat"><div class="run-stat-lbl">DISTANCE</div><div class="run-stat-val" style="color:#059669">${log.dist||'—'}<span style="font-size:11px;font-weight:600;color:var(--text3)"> km</span></div></div>
      <div class="run-stat"><div class="run-stat-lbl">DURATION</div><div class="run-stat-val" style="color:#e8453c">${log.dur||'—'}<span style="font-size:11px;font-weight:600;color:var(--text3)"> min</span></div></div>
      <div class="run-stat"><div class="run-stat-lbl">AVG PACE</div><div class="run-stat-val" style="color:#ef6b5a">${log.dist&&log.dur?Math.round(log.dur/log.dist*10)/10:'—'}<span style="font-size:11px;font-weight:600;color:var(--text3)"> /km</span></div></div>
    </div>
  </div>
  ${sec('LOG THIS RUN','#059669')}
  <div class="neo ani" style="padding:18px;margin-bottom:12px">
    <div class="grid-3" style="gap:10px;margin-bottom:12px">
      <div><div style="font-size:9px;font-weight:700;letter-spacing:1.5px;color:var(--text3);margin-bottom:5px">DISTANCE (km)</div>
        <input ${inpS} id="run_dist" type="number" step="0.1" placeholder="5.0" value="${log.dist||''}"/></div>
      <div><div style="font-size:9px;font-weight:700;letter-spacing:1.5px;color:var(--text3);margin-bottom:5px">DURATION (min)</div>
        <input ${inpS} id="run_dur" type="number" step="1" placeholder="30" value="${log.dur||''}"/></div>
      <div><div style="font-size:9px;font-weight:700;letter-spacing:1.5px;color:var(--text3);margin-bottom:5px">FEEL (1-10)</div>
        <input ${inpS} id="run_feel" type="number" min="1" max="10" placeholder="8" value="${log.feel||''}"/></div>
    </div>
    <div style="margin-bottom:12px"><div style="font-size:9px;font-weight:700;letter-spacing:1.5px;color:var(--text3);margin-bottom:5px">NOTES</div>
      <input ${inpS} id="run_notes" type="text" placeholder="Easy pace, fartlek, intervals…" value="${log.notes||''}"/></div>
    <button onclick="saveRun('${key}')" style="width:100%;padding:11px;border-radius:var(--radius-xs);border:none;background:var(--grad);color:#fff;font-family:inherit;font-size:12px;font-weight:800;letter-spacing:1px;cursor:pointer">SAVE RUN</button>
  </div>
  ${sec('SUGGESTED SESSIONS','rgba(255,255,255,0.35)')}
  <div class="grid-2">${[
    {name:'Easy Run',detail:'60-70% HR max · conversational pace',tag:'RECOVERY'},
    {name:'Tempo Run',detail:'85-90% HR max · comfortably hard',tag:'THRESHOLD'},
    {name:'Intervals',detail:'400m repeats with 90s rest between',tag:'SPEED'},
    {name:'Long Run',detail:'Easy pace · build aerobic base',tag:'ENDURANCE'},
  ].map(r=>`<div class="neo-flat ani"><div style="font-weight:700;font-size:13px">${r.name} <span class="tag t-m">${r.tag}</span></div><div style="font-size:11px;color:var(--text2);margin-top:3px">${r.detail}</div></div>`).join('')}</div>`;
}

function saveRun(key){
  const dist=parseFloat(document.getElementById('run_dist')?.value)||null;
  const dur=parseFloat(document.getElementById('run_dur')?.value)||null;
  const feel=parseInt(document.getElementById('run_feel')?.value)||null;
  const notes=document.getElementById('run_notes')?.value||'';
  const entry={};
  if(dist)entry.dist=dist;if(dur)entry.dur=dur;if(feel)entry.feel=feel;if(notes)entry.notes=notes;
  S.checks={...S.checks,[key]:entry};saveState();render();
}

// ── YOGA SESSION ─────────────────────────────────────────────────────────────
function renderYoga(day,slot){
  const flows=[
    {name:'Sun Salutation A',detail:'5 rounds · full body warm-up',dur:'10 min'},
    {name:'Hip Opener Flow',detail:'Pigeon, lizard, butterfly',dur:'15 min'},
    {name:'Spinal Twist & Release',detail:'Both sides · breathwork',dur:'10 min'},
    {name:'Standing Balance',detail:'Warrior III, tree pose',dur:'10 min'},
    {name:'Core & Plank Flow',detail:'Boat pose, side plank, hollow hold',dur:'8 min'},
    {name:'Savasana',detail:'Full body scan · deep relaxation',dur:'5 min'},
  ];
  return`<div class="run-card ani" style="background:linear-gradient(135deg,rgba(59,130,246,0.07),rgba(59,130,246,0.03));border-color:rgba(59,130,246,0.15)">
    <div style="font-size:9px;font-weight:700;letter-spacing:2px;color:var(--text3);margin-bottom:4px">${slot.toUpperCase()} YOGA</div>
    <div style="font-size:22px;font-weight:800;color:#3b82f6;margin-bottom:4px">🧘 Recovery Flow</div>
    <div style="font-size:12px;color:var(--text2)">~60 min · mobility + breath + recovery</div>
  </div>
  ${sec('FLOW SEQUENCE','#3b82f6')}
  <div class="grid-2">${flows.map((f,i)=>chkItem({name:f.name,detail:`${f.detail} · ${f.dur}`},`yg-${i}`,'cYoga')).join('')}</div>`;
}

// ── SCHEDULE EDITOR ──────────────────────────────────────────────────────────
function renderScheduleEditor(){
  const days=['MON','TUE','WED','THU','FRI','SAT','SUN'];
  const editing=S.schedEditing; // {day, slot} or null
  const sc=S.weekSchedule||DEFAULT_SCHEDULE;

  const grid=`<div class="sched-grid">${days.map(d=>{
    const ds=sc[d]||{morning:'none',evening:'rest'};
    return`<div class="sched-day-col">
      <div class="sched-day-hdr">${d}</div>
      ${['morning','evening'].map(slot=>{
        const type=ds[slot]||'none';
        const st=SESSION_TYPES[type]||SESSION_TYPES.none;
        const isEditing=editing&&editing.day===d&&editing.slot===slot;
        return`<div class="sched-slot ${type==='none'||type==='rest'?'rest-slot':''} ${isEditing?'active':''}"
          onclick="setSchedEditing('${d}','${slot}')">
          <div class="sched-slot-lbl">${slot==='morning'?'AM':'PM'}</div>
          <span class="sched-slot-icon">${st.icon}</span>
          <div class="sched-slot-type" style="color:${st.color};font-size:8px">${st.label}</div>
        </div>`;
      }).join('')}
    </div>`;
  }).join('')}</div>`;

  let picker='';
  if(editing){
    const types=Object.entries(SESSION_TYPES);
    const cur=(sc[editing.day]||{})[editing.slot]||'none';
    picker=`<div class="sched-type-picker">
      <div style="width:100%;font-size:9px;font-weight:700;letter-spacing:2px;color:var(--text3);margin-bottom:6px">
        ${editing.day} · ${editing.slot.toUpperCase()} — CHOOSE TYPE
      </div>
      ${types.map(([id,st])=>`<button class="stype-btn ${cur===id?'sel':''}" onclick="setSchedType('${editing.day}','${editing.slot}','${id}')">
        <span class="stype-btn-icon">${st.icon}</span>
        <span class="stype-btn-lbl">${st.label}</span>
      </button>`).join('')}
    </div>`;
  }

  return`${sec('WEEKLY SCHEDULE','var(--accent)')}
  <div class="neo ani" style="padding:166px;margin-bottom:8px">
    <div style="font-size:11px;color:var(--text2);margin-bottom:14px">Tap any slot to change the session type for that time.</div>
    ${grid}${picker}
  </div>`;
}

function setSchedEditing(day,slot){
  S.schedEditing=S.schedEditing&&S.schedEditing.day===day&&S.schedEditing.slot===slot?null:{day,slot};
  render();
}
function setSchedType(day,slot,type){
  const sc=JSON.parse(JSON.stringify(S.weekSchedule||DEFAULT_SCHEDULE));
  if(!sc[day])sc[day]={morning:'none',evening:'rest'};
  sc[day][slot]=type;
  S.weekSchedule=sc;
  S.schedEditing=null;
  saveState();render();
}
function renderWOD(w){
  const scores=S.wodScores[S.activeDay]||[];
  const scoresHtml=scores.length?`<div style="margin-top:10px">${sec('SCORE HISTORY','rgba(255,255,255,0.3)')}<div style="display:flex;flex-direction:column;gap:5px">${scores.slice().reverse().map(s=>`<div style="display:flex;justify-content:space-between;padding:7px 11px;background:var(--card2);border-radius:7px;font-size:12px;border:1px solid var(--border)"><span style="font-family:JetBrains Mono,monospace;font-weight:700;color:var(--accent)">${s.score}</span><span style="color:var(--text3)">${s.date}</span></div>`).join('')}</div></div>`:'';
  return`<div class="wod-hdr ani">
    <div class="wl">TODAY'S WOD</div><div class="wn">${w.name}</div>
    <div class="wm">${w.format} · ${w.duration} · ${w.focus}</div>
    <div style="margin-top:7px">${tag('Target: '+w.target)}</div>
    <div class="wnt">${w.note}</div>
    <div class="wod-score-input"><input id="wodScoreInput" class="wod-score-field" placeholder="Log your score…"/><button class="wod-score-save" onclick="logWodScore()">LOG</button></div>
    ${scoresHtml}
  </div>
  ${sec('WARM UP · 8 MIN','#fff')}<div class="grid-2">${w.warmup.map((x,i)=>chkItem(x,`w-${i}`,'cWarm')).join('')}</div>
  ${sec('THE WOD · '+w.format,'')}${w.wod.map((m,i)=>wodMove(m,i)).join('')}
  <div class="score-bar" style="margin-bottom:14px"><div><div class="score-l">FORMAT</div><div class="score-v">${w.score}</div></div><div style="text-align:right"><div class="score-l">TARGET</div><div class="score-v">${w.target}</div></div></div>
  ${sec('COOL DOWN · 5 MIN','rgba(255,255,255,0.35)')}<div class="grid-2">${w.cooldown.map((x,i)=>chkItem(x,`c-${i}`,'cCool')).join('')}</div>`;
}
function logWodScore(){const inp=document.getElementById('wodScoreInput');if(inp&&inp.value.trim()){saveWodScore(S.activeDay,inp.value.trim())}}
function renderEvening(d){
  const c=d.color;
  return`${sec('WARM UP · 10 MIN','#fff')}<div class="grid-2">${d.warmup.map((x,i)=>chkItem(x,`pw-${i}`,'pWarm')).join('')}</div>
  ${sec('MAIN · '+d.label,c)}<div class="grid-2">${d.main.map((x,i)=>exRow(x,'m',i,c)).join('')}</div>
  ${sec('EXTRAS · '+(d.extras[0]?d.extras[0].tag:''),'#f59080')}<div class="grid-2">${d.extras.map((x,i)=>exRow(x,'x',i,'#f59080')).join('')}</div>
  ${sec('CORE · '+d.core.focus,'#fff')}<div class="grid-2">${d.core.exercises.map((x,i)=>exRow(x,'cr',i,'#fff')).join('')}</div>
  ${sec('COOL DOWN · 10 MIN','rgba(255,255,255,0.35)')}<div class="grid-2">${d.cooldown.map((x,i)=>chkItem(x,`pc-${i}`,'pCool')).join('')}</div>`;
}

// ── Session completion ──────────────────────────────────────────────────────
function getSessionCompletion(day,session,w,dd){
  if(session==='morning'&&w){
    const wD=Object.values(getDayChecks(day,'cWarm')).filter(Boolean).length;
    const mD=Object.values(getDayChecks(day,'cWod')).filter(Boolean).length;
    const cD=Object.values(getDayChecks(day,'cCool')).filter(Boolean).length;
    const total=(w.warmup?.length||0)+(w.wod?.length||0)+(w.cooldown?.length||0);
    return{done:wD+mD+cD,total,pct:total?Math.round((wD+mD+cD)/total*100):0};
  }
  if(session==='evening'&&dd){
    const sets=getDayChecks(day,'cSets');
    const all=[...(dd.main||[]),...(dd.extras||[]),...(dd.core?.exercises||[])];
    let total=0,done=0;
    all.forEach((ex,i)=>{
      const pfx=i<dd.main.length?'m':i<dd.main.length+dd.extras.length?'x':'cr';
      const idx=i<dd.main.length?i:i<dd.main.length+dd.extras.length?i-dd.main.length:i-dd.main.length-dd.extras.length;
      const n=parseInt(ex.sets)||0;total+=n;
      for(let s=0;s<n;s++)if(sets[`${pfx}-${idx}-${s}`])done++;
    });
    return{done,total,pct:total?Math.round(done/total*100):0};
  }
  return{done:0,total:0,pct:0};
}

// ── DASHBOARD ───────────────────────────────────────────────────────────────
function renderDash(){
  const streak=calcStreak();
  const n=new Date();
  const cells=getHeatmapData();
  const dayLbls=['S','M','T','W','T','F','S'];
  const sessionsThisWeek=["MON","TUE","WED","THU","FRI","SAT"].filter(d=>{
    const today2=new Date();
    const dayOfWeek=DAY_KEYS.indexOf(d);
    const diff=dayOfWeek - today2.getDay();
    const target=new Date(today2);target.setDate(today2.getDate()+diff);
    const k=`${target.getFullYear()}-${target.getMonth()+1}-${target.getDate()}`;
    return !!S.streakDays[k];
  }).length;
  const todayLabel=dayLabels[todayKey]||'REST';

  // Build heatmap as a proper table-like grid: 7 rows, 12 cols
  // Group cells by column (week), 7 per column
  const weeks=[];
  for(let w=0;w<12;w++) weeks.push(cells.slice(w*7,(w+1)*7));

  return`
  <div class="dash-header ani">
    <div>
      <div style="font-size:10px;color:var(--text3);font-weight:600;letter-spacing:1.5px;text-transform:uppercase">${getGreeting()}</div>
      <div style="font-size:24px;font-weight:800;margin-top:3px;letter-spacing:-0.5px">Today, <span style="color:var(--accent)">${n.getDate()} ${MONTH_NAMES[n.getMonth()]}</span></div>
    </div>
    <div style="text-align:right;padding-top:2px">
      <div style="font-size:9px;color:var(--text3);font-weight:700;letter-spacing:1.5px">WEEK ${getWeekNumber()}</div>
      <div style="font-size:12px;color:var(--text2);margin-top:3px;font-weight:500">${DAY_LABELS_FULL[n.getDay()]}</div>
    </div>
  </div>

  <div class="stat-row ani">
    <div class="stat-card accent">
      <div class="stat-icon" style="background:rgba(232,69,60,0.08);border:1px solid rgba(232,69,60,0.15)">${svgIcon('fire',14,'#e8453c')}</div>
      <div class="stat-val" style="background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">${streak}</div>
      <div class="stat-lbl">DAY STREAK</div>
    </div>
    <div class="stat-card">
      <div class="stat-icon" style="background:rgba(5,150,105,0.08);border:1px solid rgba(5,150,105,0.12)">${svgIcon('target',14,'#059669')}</div>
      <div class="stat-val" style="color:var(--text)">${sessionsThisWeek}</div>
      <div class="stat-lbl">THIS WEEK</div>
    </div>
    <div class="stat-card">
      <div class="stat-icon" style="background:rgba(245,144,128,0.08);border:1px solid rgba(245,144,128,0.15)">${svgIcon('dumbbell',14,'#f59080')}</div>
      <div class="stat-val" style="color:var(--text);font-size:20px">${todayKey==='SUN'?'REST':todayLabel}</div>
      <div class="stat-lbl">TODAY'S SPLIT</div>
    </div>
  </div>

  <div class="quick-stats ani">
    <div class="quick-stat" onclick="set({tab:'today'})">
      <div class="quick-stat-icon" style="background:rgba(232,69,60,0.08);border-color:rgba(232,69,60,0.15)">${svgIcon('dumbbell',15,'#e8453c')}</div>
      <div><div class="quick-stat-val" style="background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">${todayKey==='SUN'?'REST':todayLabel}</div><div class="quick-stat-lbl">Tap to train</div></div>
    </div>
    <div class="quick-stat" onclick="set({tab:'track'})">
      <div class="quick-stat-icon" style="background:rgba(5,150,105,0.08);border-color:rgba(5,150,105,0.12)">${svgIcon('steps',15,'#059669')}</div>
      <div><div class="quick-stat-val" style="color:#059669">${getTrackers()[0].fmt(S.trk[0])}</div><div class="quick-stat-lbl">Steps today</div></div>
    </div>
    <div class="quick-stat" onclick="set({tab:'track'})">
      <div class="quick-stat-icon" style="background:rgba(59,130,246,0.08);border-color:rgba(59,130,246,0.12)">${svgIcon('water',15,'#3b82f6')}</div>
      <div><div class="quick-stat-val" style="color:#3b82f6">${S.trk[1]}<span style="font-size:11px;color:var(--text3)">/8</span></div><div class="quick-stat-lbl">Water glasses</div></div>
    </div>
    <div class="quick-stat" onclick="set({tab:'track'})">
      <div class="quick-stat-icon" style="background:rgba(232,69,60,0.08);border-color:rgba(232,69,60,0.12)">${svgIcon('protein',15,'#e8453c')}</div>
      <div><div class="quick-stat-val" style="color:#e8453c">${S.trk[2]}<span style="font-size:11px;color:var(--text3)">/${calcNutrition().protein}g</span></div><div class="quick-stat-lbl">Protein</div></div>
    </div>
  </div>

`;
}

// ── TODAY ───────────────────────────────────────────────────────────────────
function renderSessionContent(day, slot, type){
  if(type==='crossfit'){
    const w=getWODs()[day];
    return w?renderWOD(w):`<div class="rest"><div class="rest-t">No WOD found</div><div class="rest-d">No CrossFit workout configured for ${day}.</div></div>`;
  }
  if(type==='gym'){
    const dd=getWeekPlan().find(d=>d.day===day);
    return dd?renderEvening(dd):`<div class="rest"><div class="rest-t">No Gym Plan</div><div class="rest-d">No gym workout configured for ${day}.</div></div>`;
  }
  if(type==='run')return renderRun(day,slot);
  if(type==='yoga')return renderYoga(day,slot);
  return`<div class="rest"><div class="rest-icon">${svgIcon('sleep',28,'var(--text3)')}</div><div class="rest-t">REST DAY</div><div class="rest-d">No workouts scheduled. Hit your steps, eat enough protein, sleep 8+ hours.</div></div>`;
}

function renderToday(){
  const sc=getDaySchedule(S.activeDay);
  const sessions=getActiveSessions(S.activeDay);
  const isRest=sessions.length===0||(sessions.length===1&&sessions[0].type==='rest');

  // Ensure active session slot is valid for this day
  const validSlots=sessions.map(s=>s.slot);
  if(!validSlots.includes(S.session)&&validSlots.length>0){
    S.session=validSlots[0];
  }

  const activeSession=sessions.find(s=>s.slot===S.session)||sessions[0];
  const activeType=activeSession?.type||'rest';
  const st=SESSION_TYPES[activeType]||SESSION_TYPES.rest;

  // Compute completion for banner
  const w=getWODs()[S.activeDay];
  const dd=getWeekPlan().find(d=>d.day===S.activeDay);
  const comp=!isRest?getSessionCompletion(S.activeDay,S.session,w,dd):{done:0,total:0,pct:0};
  const showBanner=comp.pct===100&&comp.total>0;
  if(showBanner&&S.activeDay===todayKey)markStreakDay();

  // Build day chips from schedule
  const dayChips=(['MON','TUE','WED','THU','FRI','SAT','SUN']).map(d=>{
    const dsc=getDaySchedule(d);
    const dsessions=getActiveSessions(d);
    const isOff=dsessions.length===0||(dsessions.length===1&&dsessions[0].type==='rest');
    const types=dsessions.filter(s=>s.type!=='rest'&&s.type!=='none').map(s=>SESSION_TYPES[s.type]?.icon||'').join('');
    const isToday=d===todayKey;
    return`<div class="day-chip ${S.activeDay===d?'active':''}" onclick="set({activeDay:'${d}',tab:'today'})">
      ${isToday?'<div class="today-dot"></div>':''}
      <div class="day-chip-day">${d}</div>
      <div class="day-chip-label" style="font-size:${types.length>1?'10px':'12px'}">${isOff?'OFF':types||'—'}</div>
      <div class="day-chip-sub">${dsessions.filter(s=>s.type!=='rest'&&s.type!=='none').length>1?'2×':dsessions[0]?.type!=='rest'&&dsessions[0]?.type!=='none'?'1×':''}</div>
    </div>`;
  }).join('');

  let h=`<div class="page-header"><div>
    <div class="page-title" style="display:flex;align-items:center;gap:10px">
      <span>${st.icon}</span>
      <span>${S.activeDay} · <span style="color:${st.color}">${st.label.toUpperCase()}</span></span>
    </div>
    <div class="page-subtitle">${getDateSubtitle()}</div>
  </div>
  <button onclick="set({tab:'week'})" style="padding:7px 14px;border-radius:99px;border:1px solid var(--border);background:var(--card2);font-family:inherit;font-size:10px;font-weight:700;color:var(--text2);cursor:pointer;align-self:flex-start;margin-top:4px">EDIT SCHEDULE</button>
  </div>`;
  h+=`<div class="strip-wrap"><div class="week-strip">${dayChips}</div><div class="strip-fade"></div></div>`;
  h+=`<div class="steps ani"><div class="steps-icon">${svgIcon('steps',16,'var(--accent)')}</div><div><div class="steps-l">DAILY STEP GOAL</div><div class="steps-v">10,000 steps</div></div></div>`;

  if(isRest){
    h+=`<div class="rest"><div class="rest-icon">${svgIcon('sleep',28,'var(--text3)')}</div><div class="rest-t">REST DAY</div><div class="rest-d">No workouts today. Hit your steps, eat enough protein, sleep 8+ hours.</div></div>`;
  } else {
    h+=sessionToggle('session');
    if(sessions.length>0)h+='<div style="height:10px"></div>';
    if(showBanner&&(activeType==='crossfit'||activeType==='gym'))h+=`<div class="session-complete"><div class="session-complete-icon">${svgIcon('check',16,'#059669')}</div><div><div class="session-complete-t">SESSION COMPLETE!</div><div class="session-complete-s">${comp.total} movements done · ${S.activeDay} ${st.label} ✓</div></div></div>`;
    h+=renderSessionContent(S.activeDay, S.session, activeType);
  }
  return h;
}

// ── WEEK ────────────────────────────────────────────────────────────────────
function renderWeek(){
  S.activeDay=S.weekDay;
  const sessions=getActiveSessions(S.weekDay);
  const validSlots=sessions.map(s=>s.slot);
  if(!validSlots.includes(S.weekSession)&&validSlots.length>0)S.weekSession=validSlots[0];
  const activeSession=sessions.find(s=>s.slot===S.weekSession)||sessions[0];
  const activeType=activeSession?.type||'rest';

  const daySummary=(['MON','TUE','WED','THU','FRI','SAT','SUN']).map(d=>{
    const dsessions=getActiveSessions(d);
    const types=dsessions.filter(s=>s.type!=='rest'&&s.type!=='none');
    return`<button class="wk-btn ${S.weekDay===d?'active':''}" onclick="set({weekDay:'${d}',weekSession:'morning'})">
      ${d}${d===todayKey?'·':''}
      <span style="font-size:9px;display:block;margin-top:2px;opacity:0.7">${types.map(s=>SESSION_TYPES[s.type]?.icon||'').join('')||'—'}</span>
    </button>`;
  }).join('');

  return`<div class="page-header"><div><div class="page-title">Week Plan</div><div class="page-subtitle">SCHEDULE · ${getDateSubtitle()}</div></div></div>
  ${renderScheduleEditor()}
  <div style="height:6px"></div>
  ${sec('PREVIEW: '+S.weekDay,'var(--accent)')}
  <div class="wk-sel">${daySummary}</div>
  ${sessionToggle('weekSession')}<div style="height:10px"></div>
  ${renderSessionContent(S.weekDay, S.weekSession, activeType)}`;
}

// ── MEALS ───────────────────────────────────────────────────────────────────
function renderMeals(){
  const n=calcNutrition();
  const g=GOALS[S.goal]||GOALS.build_muscle;
  return`<div class="page-header"><div><div class="page-title">Nutrition</div><div class="page-subtitle">DAILY MEAL PLAN · ${n.kcal.toLocaleString()} KCAL TARGET</div></div></div>
  <div class="grid-4 ani" style="margin-bottom:20px">${[{l:"PROTEIN",v:`~${n.protein}g`,c:"#e8453c"},{l:"CARBS",v:`~${n.carbs}g`,c:"#3b82f6"},{l:"FATS",v:`~${n.fats}g`,c:"#f59080"},{l:"CALORIES",v:`~${n.kcal.toLocaleString()}`,c:"#059669"}].map(m=>`<div class="neo" style="text-align:center;padding:14px 10px"><div class="macro-l">${m.l}</div><div class="macro-v" style="color:${m.c}">${m.v}</div></div>`).join('')}</div>
  <div class="neo ani" style="padding:14px 18px;margin-bottom:16px;display:flex;align-items:center;gap:14px">
    <div style="font-size:22px">${g.emoji}</div>
    <div><div style="font-size:12px;font-weight:800;color:var(--accent)">${g.label}</div><div style="font-size:11px;color:var(--text2);margin-top:2px">${g.desc} · TDEE ~${n.tdee.toLocaleString()} kcal</div></div>
    <button onclick="set({tab:'goals'})" style="margin-left:auto;padding:6px 12px;border-radius:99px;border:1px solid rgba(232,69,60,0.25);background:rgba(232,69,60,0.07);color:var(--accent);font-size:10px;font-weight:700;cursor:pointer;font-family:inherit">EDIT GOAL</button>
  </div>
  <div class="grid-2">${meals.map(m=>`<div class="neo-sm ani">
    <div class="meal-h">
      <div class="meal-i">
        <div class="meal-icon">${svgIcon(m.mealIcon,16,'var(--accent)')}</div>
        <div><div class="meal-t">${m.time}</div><div class="meal-n">${m.label}</div></div>
      </div>
      <span class="meal-k">${m.macros.kcal}</span>
    </div>
    <ul class="meal-list">${m.items.map(it=>`<li>${it}</li>`).join('')}</ul>
    <div class="meal-macros">${tag('P:'+m.macros.p+'g','t-push')} ${tag('C:'+m.macros.c+'g','t-pull')} ${tag('F:'+m.macros.f+'g','t-m')}</div>
  </div>`).join('')}</div>`;
}

// ── TRACK ───────────────────────────────────────────────────────────────────
function renderTrack(){
  const latest=latestMeasurement();const prev=prevMeasurement();
  const mFields=[{k:'weight',l:'Weight',u:'kg',lb:true},{k:'chest',l:'Chest',u:'cm'},{k:'waist',l:'Waist',u:'cm',lb:true},{k:'hips',l:'Hips',u:'cm'},{k:'arms',l:'Arms',u:'cm'},{k:'thighs',l:'Thighs',u:'cm'}];
  const logItems=[
    {ic:'chart',l:'Lifts & weights',d:'Every evening session.'},
    {ic:'timer',l:'WOD scores',d:'Rounds, reps, times.'},
    {ic:'scale',l:'Body weight',d:'Weekly, same time.'},
    {ic:'camera',l:'Progress photos',d:'Every 2 weeks.'},
    {ic:'sleep',l:'Sleep quality',d:'Hours + how you felt.'},
    {ic:'energy',l:'Energy & mood',d:'Rate 1-10 daily.'}
  ];
  return`<div class="page-header"><div><div class="page-title">Track</div><div class="page-subtitle">DAILY METRICS</div></div></div>
  ${sec('DAILY TRACKERS')}
  <div class="grid-4" style="margin-bottom:20px">${getTrackers().map((t,i)=>{
    const v=S.trk[i];const p=Math.min(100,Math.round(v/t.target*100));const disp=t.fmt?t.fmt(v):v;
    return`<div class="neo ani" style="padding:16px">
      <div class="trk-icon">${svgIcon(t.trkIcon,15,t.color)}</div>
      <div class="trk-l">${t.label}</div>
      <div class="trk-row"><span class="trk-v" style="color:${t.color}">${disp}</span><span class="trk-u"> ${t.unit}</span></div>
      <div class="trk-bar"><div class="trk-fill" style="width:${p}%;background:${t.color}"></div></div>
      <div class="trk-btns"><button class="trk-btn" onclick="adjTrk(${i},-${t.inc})">−${t.inc}</button><button class="trk-btn" style="color:${t.color}" onclick="adjTrk(${i},${t.inc})">+${t.inc}</button></div>
    </div>`;
  }).join('')}</div>
  ${sec('BODY MEASUREMENTS','#f59080')}
  <div class="neo" style="padding:16px;margin-bottom:12px">
    <div class="grid-3" style="margin-bottom:14px">${mFields.map(f=>{const v=latest?latest[f.k]:'—';const pv=prev?prev[f.k]:null;return`<div style="text-align:center;padding:9px 4px;background:var(--card2);border-radius:7px;border:1px solid var(--border)"><div style="font-size:8px;color:var(--text3);font-weight:700;letter-spacing:1.5px">${f.l.toUpperCase()}</div><div style="font-size:18px;font-weight:800;margin-top:3px;font-family:JetBrains Mono,monospace">${v}${latest&&pv?trendArrow(parseFloat(v),parseFloat(pv),f.lb):''}</div><div style="font-size:9px;color:var(--text3)">${f.u}</div></div>`}).join('')}</div>
    <div style="font-size:9px;font-weight:700;letter-spacing:1.5px;color:var(--text3);margin-bottom:9px">LOG NEW</div>
    <div class="meas-form">${mFields.map(f=>`<div class="meas-inp-wrap"><label>${f.l}</label><input type="number" id="meas_${f.k}" placeholder="—" step="0.1" class="meas-inp"/></div>`).join('')}</div>
    <button class="meas-save-btn" onclick="logMeasurements()">SAVE MEASUREMENTS</button>
  </div>
  ${sec('WEEKLY LOG','rgba(255,255,255,0.35)')}
  <div class="grid-3">${logItems.map(it=>`<div class="neo-flat ani"><div class="log"><div class="log-icon">${svgIcon(it.ic,14,'var(--text2)')}</div><div><div class="log-l">${it.l}</div><div class="log-d">${it.d}</div></div></div></div>`).join('')}</div>
  <div style="height:14px"></div>
  <div class="neo ani" style="padding:18px"><div style="font-size:9px;font-weight:700;letter-spacing:2px;color:var(--text3);margin-bottom:13px">TWO-A-DAY RULES</div>${["4+ hrs between morning and evening sessions","Eat a proper meal between sessions — not just a snack","If energy is below 5/10, scale back — do not skip","Morning CrossFit at 80% — save 20% for the gym","Extra hydration — two sessions doubles sweat loss","Sleep 8+ hrs — double recovery demand"].map(r=>`<div class="rule"><div class="rule-dot"></div><span class="rule-t">${r}</span></div>`).join('')}</div>`;
}
function logMeasurements(){
  const fields=['weight','chest','waist','hips','arms','thighs'];
  const entry={};let hasVal=false;
  fields.forEach(f=>{const v=document.getElementById('meas_'+f)?.value;if(v){entry[f]=parseFloat(v);hasVal=true;}});
  if(hasVal)saveMeasurement(entry);
}

// ── BUILD ───────────────────────────────────────────────────────────────────
function renderBuild(){
  const customs=S.customWorkouts;
  const exInputs=S.buildExercises||[];
  return`<div class="page-header"><div><div class="page-title">Build</div><div class="page-subtitle">CUSTOM WORKOUT BUILDER</div></div></div>
  ${sec('CREATE WORKOUT','#f59080')}
  <div class="neo" style="padding:18px;margin-bottom:18px">
    <div class="build-row"><input id="buildName" class="build-inp" placeholder="Workout name…"/></div>
    <div id="buildExList">${exInputs.map((ex,i)=>`<div class="build-ex-row"><input class="build-inp build-inp-sm" value="${ex.name}" oninput="updateBuildEx(${i},'name',this.value)" placeholder="Exercise"/><input class="build-inp build-inp-xs" value="${ex.sets}" oninput="updateBuildEx(${i},'sets',this.value)" placeholder="Sets"/><input class="build-inp build-inp-xs" value="${ex.reps}" oninput="updateBuildEx(${i},'reps',this.value)" placeholder="Reps"/><button class="build-del" onclick="removeBuildEx(${i})">✕</button></div>`).join('')}</div>
    <button class="build-add-ex" onclick="addBuildEx()">+ ADD EXERCISE</button>
    <button class="build-save-btn" onclick="saveBuild()">SAVE WORKOUT</button>
  </div>
  ${customs.length?sec('SAVED WORKOUTS','#fff'):''}
  ${customs.map((w,i)=>`<div class="neo-sm ani"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:9px"><span style="font-weight:800;font-size:14px">${w.name}</span><button class="build-del" onclick="deleteCustomWorkout(${i})">✕</button></div>${w.exercises.map(ex=>`<div style="display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid var(--border);font-size:12px"><span style="font-weight:600">${ex.name}</span><span style="color:var(--text3)">${ex.sets}×${ex.reps}</span></div>`).join('')}</div>`).join('')}`;
}
function addBuildEx(){S.buildExercises=[...(S.buildExercises||[]),{name:'',sets:'3',reps:'10'}];render()}
function removeBuildEx(i){S.buildExercises=(S.buildExercises||[]).filter((_,idx)=>idx!==i);render()}
function updateBuildEx(i,field,val){if(S.buildExercises&&S.buildExercises[i])S.buildExercises[i][field]=val}
function saveBuild(){
  const name=document.getElementById('buildName')?.value?.trim();
  if(!name||(S.buildExercises||[]).length===0)return;
  const exercises=(S.buildExercises||[]).filter(e=>e.name.trim());
  if(!exercises.length)return;
  saveCustomWorkout({name,exercises});S.buildExercises=[];render();
}

// ── GOALS & PROFILE ─────────────────────────────────────────────────────────
function renderGoals(){
  const p=S.profile;
  const n=calcNutrition();
  const isMetric=p.units==='metric';
  const wLabel=isMetric?'kg':'lbs';
  const hLabel=isMetric?'cm':'inches';
  const goalCards=Object.entries(GOALS).map(([id,g])=>{
    const active=S.goal===id;
    const defSched=DEFAULT_SCHEDULES[id];
    const sessCount=Object.values(defSched).filter(d=>d.morning!=='none'||d.evening!=='rest').length;
    return`<div onclick="set({goal:'${id}'})" style="cursor:pointer;padding:16px;border-radius:var(--radius-sm);border:2px solid ${active?'var(--accent)':'var(--border)'};background:${active?'rgba(232,69,60,0.06)':'var(--card2)'};transition:all 0.2s;margin-bottom:8px">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:5px">
        <span style="font-size:20px">${g.emoji}</span>
        <div style="flex:1">
          <div style="font-weight:800;font-size:13px;color:${active?'var(--accent)':'var(--text)'}">${g.label}</div>
          <div style="font-size:10px;color:var(--text2);margin-top:1px">${g.desc}</div>
          <div style="font-size:9px;color:var(--text3);margin-top:3px">Default: ${sessCount} active days · ${Object.values(defSched).some(d=>d.morning==='run')?'Run focus':'Gym + CrossFit'}</div>
        </div>
        ${active?`<div style="width:18px;height:18px;border-radius:50%;background:var(--grad);display:flex;align-items:center;justify-content:center;flex-shrink:0">${svgIcon('check',9,'#fff')}</div>`:''}
      </div>
    </div>`;
  }).join('');

  const inpStyle=`width:100%;padding:9px 12px;border-radius:var(--radius-xs);border:1px solid var(--border2);background:var(--card2);font-family:inherit;font-size:13px;font-weight:600;color:var(--text);outline:none;box-sizing:border-box`;

  return`<div class="page-header"><div><div class="page-title">Goals & Profile</div><div class="page-subtitle">PERSONALISE YOUR TARGETS</div></div></div>

  ${sec('YOUR GOAL','var(--accent)')}
  <div class="neo ani" style="padding:16px;margin-bottom:18px">${goalCards}</div>

  ${sec('BODY STATS','var(--accent)')}
  <div class="neo ani" style="padding:18px;margin-bottom:18px">
    <div style="display:flex;gap:8px;margin-bottom:16px">
      <button onclick="saveProfile({units:'metric'})" style="flex:1;padding:8px;border-radius:99px;border:1px solid ${isMetric?'var(--accent)':'var(--border)'};background:${isMetric?'rgba(232,69,60,0.08)':'transparent'};color:${isMetric?'var(--accent)':'var(--text2)'};font-size:11px;font-weight:700;cursor:pointer;font-family:inherit">METRIC (kg/cm)</button>
      <button onclick="saveProfile({units:'imperial'})" style="flex:1;padding:8px;border-radius:99px;border:1px solid ${!isMetric?'var(--accent)':'var(--border)'};background:${!isMetric?'rgba(232,69,60,0.08)':'transparent'};color:${!isMetric?'var(--accent)':'var(--text2)'};font-size:11px;font-weight:700;cursor:pointer;font-family:inherit">IMPERIAL (lbs/in)</button>
    </div>
    <div class="grid-2" style="gap:12px;margin-bottom:12px">
      <div><div style="font-size:9px;font-weight:700;letter-spacing:1.5px;color:var(--text3);margin-bottom:5px">WEIGHT (${wLabel})</div>
        <input id="prof_weight" type="number" value="${p.weight}" style="${inpStyle}" oninput="liveProfile()"/></div>
      <div><div style="font-size:9px;font-weight:700;letter-spacing:1.5px;color:var(--text3);margin-bottom:5px">HEIGHT (${hLabel})</div>
        <input id="prof_height" type="number" value="${p.height}" style="${inpStyle}" oninput="liveProfile()"/></div>
      <div><div style="font-size:9px;font-weight:700;letter-spacing:1.5px;color:var(--text3);margin-bottom:5px">AGE</div>
        <input id="prof_age" type="number" value="${p.age}" style="${inpStyle}" oninput="liveProfile()"/></div>
      <div><div style="font-size:9px;font-weight:700;letter-spacing:1.5px;color:var(--text3);margin-bottom:5px">BIOLOGICAL SEX</div>
        <select id="prof_sex" style="${inpStyle}" onchange="liveProfile()">
          <option value="male" ${p.sex==='male'?'selected':''}>Male</option>
          <option value="female" ${p.sex==='female'?'selected':''}>Female</option>
        </select></div>
    </div>
    <button onclick="saveProfileForm()" style="width:100%;padding:11px;border-radius:var(--radius-xs);border:none;background:var(--grad);color:#fff;font-family:inherit;font-size:12px;font-weight:800;letter-spacing:1px;cursor:pointer">SAVE PROFILE</button>
  </div>

  ${sec('CALCULATED TARGETS','var(--accent)')}
  <div class="neo ani" style="padding:18px;margin-bottom:8px" id="calc_preview">
    ${renderNutritionPreview(n)}
  </div>`;
}

function renderNutritionPreview(n){
  const g=GOALS[S.goal]||GOALS.build_muscle;
  const p=S.profile;
  const isMetric=p.units==='metric';
  const bmi=isMetric?(p.weight/(p.height/100)**2).toFixed(1):((p.weight*703)/(p.height**2)).toFixed(1);
  return`<div style="font-size:9px;font-weight:700;letter-spacing:2px;color:var(--text3);margin-bottom:14px">MACROS · ${g.emoji} ${g.label.toUpperCase()}</div>
  <div class="grid-4" style="margin-bottom:16px">
    ${[{l:'CALORIES',v:n.kcal.toLocaleString(),u:'kcal',c:'#059669'},{l:'PROTEIN',v:n.protein,u:'g',c:'#e8453c'},{l:'CARBS',v:n.carbs,u:'g',c:'#3b82f6'},{l:'FATS',v:n.fats,u:'g',c:'#f59080'}].map(x=>`<div style="text-align:center;padding:10px 4px;background:var(--card2);border-radius:8px;border:1px solid var(--border)"><div style="font-size:8px;color:var(--text3);font-weight:700;letter-spacing:1px">${x.l}</div><div style="font-size:18px;font-weight:800;color:${x.c};font-family:JetBrains Mono,monospace;margin-top:3px">${x.v}</div><div style="font-size:9px;color:var(--text3)">${x.u}</div></div>`).join('')}
  </div>
  <div style="display:flex;gap:10px;flex-wrap:wrap">
    <div style="flex:1;min-width:120px;padding:10px 14px;background:var(--card2);border-radius:8px;border:1px solid var(--border)"><div style="font-size:8px;color:var(--text3);font-weight:700;letter-spacing:1px">BASE METABOLIC RATE</div><div style="font-size:15px;font-weight:800;margin-top:3px;font-family:JetBrains Mono,monospace">${n.tdee - Math.round((n.tdee - n.kcal)) > 0 ? (n.kcal - (GOALS[S.goal]?.surplusKcal||0)).toLocaleString() : '—'} <span style="font-size:10px;color:var(--text3)">kcal</span></div></div>
    <div style="flex:1;min-width:120px;padding:10px 14px;background:var(--card2);border-radius:8px;border:1px solid var(--border)"><div style="font-size:8px;color:var(--text3);font-weight:700;letter-spacing:1px">TDEE (MAINTENANCE)</div><div style="font-size:15px;font-weight:800;margin-top:3px;font-family:JetBrains Mono,monospace">${n.tdee.toLocaleString()} <span style="font-size:10px;color:var(--text3)">kcal</span></div></div>
    <div style="flex:1;min-width:120px;padding:10px 14px;background:var(--card2);border-radius:8px;border:1px solid var(--border)"><div style="font-size:8px;color:var(--text3);font-weight:700;letter-spacing:1px">BMI</div><div style="font-size:15px;font-weight:800;margin-top:3px;font-family:JetBrains Mono,monospace">${bmi}</div></div>
  </div>`;
}

function liveProfile(){
  // Live-update preview without saving
  const w=parseFloat(document.getElementById('prof_weight')?.value)||S.profile.weight;
  const h=parseFloat(document.getElementById('prof_height')?.value)||S.profile.height;
  const a=parseInt(document.getElementById('prof_age')?.value)||S.profile.age;
  const sx=document.getElementById('prof_sex')?.value||S.profile.sex;
  const tmpProfile={...S.profile,weight:w,height:h,age:a,sex:sx};
  const origProfile=S.profile;
  S.profile=tmpProfile;
  const n=calcNutrition();
  S.profile=origProfile;
  const el=document.getElementById('calc_preview');
  if(el)el.innerHTML=renderNutritionPreview(n);
}
function saveProfile(patch){S.profile={...S.profile,...patch};saveState();render();}
function saveProfileForm(){
  const w=parseFloat(document.getElementById('prof_weight')?.value);
  const h=parseFloat(document.getElementById('prof_height')?.value);
  const a=parseInt(document.getElementById('prof_age')?.value);
  const sx=document.getElementById('prof_sex')?.value;
  const patch={};
  if(!isNaN(w))patch.weight=w;
  if(!isNaN(h))patch.height=h;
  if(!isNaN(a))patch.age=a;
  if(sx)patch.sex=sx;
  S.profile={...S.profile,...patch};
  saveState();render();
}

// ── RENDER ──────────────────────────────────────────────────────────────────
let _lastTab=null;
function render(){
  renderSidebar();renderMobNav();
  let c='';
  switch(S.tab){
    case'today':c=renderToday();break;
    case'week':c=renderWeek();break;
    case'meals':c=renderMeals();break;
    case'track':c=renderTrack();break;
    case'build':c=renderBuild();break;
    case'goals':c=renderGoals();break;
    default:c=renderToday();break;
  }
  const el=document.getElementById('main');el.innerHTML=c;
  if(S.tab!==_lastTab){
    _lastTab=S.tab;
    el.querySelectorAll('.ani').forEach((n,i)=>{
      n.style.animation='none';
      n.offsetHeight; // force reflow
      n.style.animation=`fadeUp 0.3s cubic-bezier(.4,0,.2,1) ${(i*0.03).toFixed(2)}s both`;
    });
  }
}
function toggleDark(){const l=document.body.classList.toggle('light');document.getElementById('darkToggle').textContent=l?'🌙':'☀️';try{localStorage.setItem('ft_theme',l?'light':'dark')}catch(e){}}
function initDark(){try{const s=localStorage.getItem('ft_theme');const goLight=s==='light'||s===null;if(goLight){document.body.classList.add('light');document.getElementById('darkToggle').textContent='🌙';}else{document.getElementById('darkToggle').textContent='☀️';}}catch(e){}}

// ── TIMER ───────────────────────────────────────────────────────────────────
let T={total:60,remaining:60,running:false,interval:null};
const CIRC=2*Math.PI*38;
function openTimer(){document.getElementById('timerFab').classList.add('hidden');document.getElementById('timer-widget').classList.add('visible')}
function closeTimer(){timerStop();document.getElementById('timer-widget').classList.remove('visible');document.getElementById('timerFab').classList.remove('hidden')}
function setPreset(secs,btn){timerStop();T.total=secs;T.remaining=secs;document.querySelectorAll('.timer-preset').forEach(b=>b.classList.remove('sel'));btn.classList.add('sel');updateTimerUI()}
function timerToggle(){T.running?timerStop():timerStart()}
function timerStart(){if(T.remaining<=0)timerReset();T.running=true;document.getElementById('timerStartBtn').textContent='PAUSE';T.interval=setInterval(()=>{T.remaining--;updateTimerUI();if(T.remaining<=0){timerStop();timerDone()}},1000)}
function timerStop(){T.running=false;clearInterval(T.interval);document.getElementById('timerStartBtn').textContent='START'}
function timerReset(){timerStop();T.remaining=T.total;document.getElementById('timerRing').classList.remove('done');updateTimerUI()}
function timerDone(){document.getElementById('timerRing').classList.add('done');document.getElementById('timerStartBtn').textContent='START';try{const ctx=new(window.AudioContext||window.webkitAudioContext)();[0,0.18,0.36].forEach(delay=>{const osc=ctx.createOscillator();const gain=ctx.createGain();osc.connect(gain);gain.connect(ctx.destination);osc.type='sine';osc.frequency.value=880;gain.gain.setValueAtTime(0.4,ctx.currentTime+delay);gain.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+delay+0.25);osc.start(ctx.currentTime+delay);osc.stop(ctx.currentTime+delay+0.3)})}catch(e){}}
function updateTimerUI(){const m=Math.floor(T.remaining/60);const s=T.remaining%60;document.getElementById('timerDisplay').textContent=`${m}:${s.toString().padStart(2,'0')}`;const pct=T.total>0?T.remaining/T.total:0;document.getElementById('timerArc').style.strokeDashoffset=CIRC*(1-pct);document.getElementById('timerArc').style.strokeDasharray=CIRC}

loadState();initDark();render();updateTimerUI();

// ── MESH BACKGROUND ──────────────────────────────────────────────────────────
(function(){
  const c=document.getElementById('meshBg'),x=c.getContext('2d');
  // Warm coral / cream blobs
  const blobs=[
    {cx:0.15,cy:0.2, r:0.55,color:[232,150,140],vx:0.06,vy:0.04,phase:0},      // coral pink
    {cx:0.75,cy:0.15,r:0.45,color:[242,234,228],vx:-0.05,vy:0.05,phase:1.5},    // warm cream
    {cx:0.85,cy:0.6, r:0.5, color:[248,180,160],vx:-0.04,vy:-0.03,phase:3.0},   // peach
    {cx:0.5,cy:0.85, r:0.48,color:[245,200,185],vx:0.05,vy:-0.05,phase:4.2},    // light salmon
    {cx:0.3,cy:0.55, r:0.42,color:[238,220,210],vx:-0.03,vy:0.06,phase:2.3},    // warm mist
    {cx:0.65,cy:0.4, r:0.4, color:[240,160,140],vx:0.04,vy:0.04,phase:5.1},     // coral
    {cx:0.1,cy:0.75, r:0.38,color:[245,210,195],vx:0.05,vy:-0.04,phase:0.8},    // blush
    {cx:0.9,cy:0.9, r:0.35,color:[235,225,215],vx:-0.06,vy:-0.03,phase:3.7},    // warm sand
  ];
  function resize(){c.width=window.innerWidth;c.height=window.innerHeight}
  window.addEventListener('resize',resize);resize();
  function draw(t){
    const w=c.width,h=c.height;
    x.fillStyle='#ede9e5';
    x.fillRect(0,0,w,h);
    x.globalCompositeOperation='lighter';
    const time=t*0.0001;
    blobs.forEach(b=>{
      const bx=(b.cx+Math.sin(time*b.vx*12+b.phase)*0.1)*w;
      const by=(b.cy+Math.cos(time*b.vy*12+b.phase)*0.08)*h;
      const br=b.r*(0.96+Math.sin(time*1.2+b.phase)*0.04)*Math.max(w,h);
      const g=x.createRadialGradient(bx,by,0,bx,by,br);
      g.addColorStop(0,`rgba(${b.color[0]},${b.color[1]},${b.color[2]},0.6)`);
      g.addColorStop(0.4,`rgba(${b.color[0]},${b.color[1]},${b.color[2]},0.3)`);
      g.addColorStop(1,`rgba(${b.color[0]},${b.color[1]},${b.color[2]},0)`);
      x.fillStyle=g;
      x.beginPath();x.arc(bx,by,br,0,Math.PI*2);x.fill();
    });
    x.globalCompositeOperation='source-over';
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
})();
