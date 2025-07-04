import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  LockIcon,
  PlusIcon,
  TrophyIcon,
  CalendarIcon,
  TargetIcon,
  CoinsIcon,
} from "lucide-react";

interface ParentAdminPanelProps {
  authenticated?: boolean;
  onAuthenticate?: (password: string) => void;
  onAddEggs?: (amount: number, reason: string) => void;
  currentEggBalance?: number;
  studyProgress?: {
    totalMinutes: number;
    weeklyGoal: number;
    achievements: Array<{
      id: string;
      title: string;
      date: Date;
      eggs: number;
    }>;
  };
  studyGoals?: Array<{
    id: string;
    title: string;
    description: string;
    reward: number;
    completed: boolean;
  }>;
}

const ParentAdminPanel: React.FC<ParentAdminPanelProps> = ({
  authenticated = false,
  onAuthenticate = () => {},
  onAddEggs = () => {},
  currentEggBalance = 0,
  studyProgress = {
    totalMinutes: 0,
    weeklyGoal: 300,
    achievements: [
      { id: "1", title: "Completed Math Homework", date: new Date(), eggs: 5 },
      {
        id: "2",
        title: "Read for 30 minutes",
        date: new Date(Date.now() - 86400000),
        eggs: 3,
      },
      {
        id: "3",
        title: "Practiced Writing",
        date: new Date(Date.now() - 172800000),
        eggs: 4,
      },
    ],
  },
  studyGoals = [
    {
      id: "1",
      title: "Complete Math Workbook",
      description: "Finish pages 10-15 in the math workbook",
      reward: 10,
      completed: false,
    },
    {
      id: "2",
      title: "Read a Chapter Book",
      description: "Read one chapter book this week",
      reward: 15,
      completed: false,
    },
    {
      id: "3",
      title: "Practice Spelling Words",
      description: "Learn all 10 spelling words for the week",
      reward: 8,
      completed: true,
    },
  ],
}) => {
  const [password, setPassword] = useState("");
  const [eggAmount, setEggAmount] = useState(1);
  const [eggReason, setEggReason] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    reward: 5,
  });

  const handleAuthenticate = (e: React.FormEvent) => {
    e.preventDefault();
    onAuthenticate(password);
  };

  const handleAddEggs = (e: React.FormEvent) => {
    e.preventDefault();
    onAddEggs(eggAmount, eggReason);
    setEggAmount(1);
    setEggReason("");
  };

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementation would be handled by parent component
    setNewGoal({ title: "", description: "", reward: 5 });
  };

  if (!authenticated) {
    return (
      <div className="flex items-center justify-center min-h-[600px] bg-background">
        <Card className="w-[400px] shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <LockIcon className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-center text-2xl">
              Parent Access
            </CardTitle>
            <CardDescription className="text-center">
              Enter your password to access the admin panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAuthenticate}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-background">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Parent Admin Panel</h1>
        <div className="flex items-center gap-2">
          <CoinsIcon className="h-6 w-6 text-yellow-500" />
          <span className="text-xl font-semibold">
            {currentEggBalance} Golden Eggs
          </span>
        </div>
      </div>

      <Tabs defaultValue="add-eggs" className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="add-eggs">Add Golden Eggs</TabsTrigger>
          <TabsTrigger value="progress">Study Progress</TabsTrigger>
          <TabsTrigger value="goals">Study Goals</TabsTrigger>
        </TabsList>

        <TabsContent value="add-eggs">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PlusIcon className="h-5 w-5" /> Add Golden Eggs
              </CardTitle>
              <CardDescription>
                Reward your child with golden eggs for completing study
                activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddEggs}>
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="egg-amount">Number of Eggs</Label>
                    <Input
                      id="egg-amount"
                      type="number"
                      min="1"
                      value={eggAmount}
                      onChange={(e) => setEggAmount(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="egg-reason">Reason for Reward</Label>
                    <Textarea
                      id="egg-reason"
                      placeholder="e.g., Completed math homework, Read for 30 minutes"
                      value={eggReason}
                      onChange={(e) => setEggReason(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Add Golden Eggs
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrophyIcon className="h-5 w-5" /> Study Achievements
                </CardTitle>
                <CardDescription>
                  Recent study activities and rewards
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {studyProgress.achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className="flex justify-between items-center p-3 bg-muted rounded-lg"
                    >
                      <div>
                        <h4 className="font-medium">{achievement.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {achievement.date.toLocaleDateString()}
                        </p>
                      </div>
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        <CoinsIcon className="h-3 w-3 text-yellow-500" />
                        {achievement.eggs} eggs
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" /> Study Calendar
                </CardTitle>
                <CardDescription>
                  Track study sessions and progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border mb-4"
                  />
                  <div className="w-full mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">
                        Weekly Progress
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {studyProgress.totalMinutes} /{" "}
                        {studyProgress.weeklyGoal} minutes
                      </span>
                    </div>
                    <Progress
                      value={
                        (studyProgress.totalMinutes /
                          studyProgress.weeklyGoal) *
                        100
                      }
                      className="h-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="goals">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TargetIcon className="h-5 w-5" /> Study Goals
                </CardTitle>
                <CardDescription>
                  Set and manage study goals with egg rewards
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {studyGoals.map((goal) => (
                    <div key={goal.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{goal.title}</h3>
                        <Badge variant={goal.completed ? "default" : "outline"}>
                          {goal.completed ? "Completed" : "In Progress"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {goal.description}
                      </p>
                      <div className="flex items-center gap-1 text-sm">
                        <CoinsIcon className="h-3 w-3 text-yellow-500" />
                        <span>{goal.reward} eggs reward</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Add New Goal</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddGoal}>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="goal-title">Goal Title</Label>
                      <Input
                        id="goal-title"
                        value={newGoal.title}
                        onChange={(e) =>
                          setNewGoal({ ...newGoal, title: e.target.value })
                        }
                        placeholder="e.g., Complete Math Worksheet"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="goal-description">Description</Label>
                      <Textarea
                        id="goal-description"
                        value={newGoal.description}
                        onChange={(e) =>
                          setNewGoal({
                            ...newGoal,
                            description: e.target.value,
                          })
                        }
                        placeholder="Describe what needs to be done"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="goal-reward">Egg Reward</Label>
                      <Input
                        id="goal-reward"
                        type="number"
                        min="1"
                        value={newGoal.reward}
                        onChange={(e) =>
                          setNewGoal({
                            ...newGoal,
                            reward: parseInt(e.target.value),
                          })
                        }
                      />
                    </div>
                    <Button type="submit">Add Goal</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ParentAdminPanel;
