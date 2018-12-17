library(ggplot2)

# Get input data
all_data = readLines("../GitHub/advent-of-code-2018/src/days/10/input.txt")

# Parse numbers from input data
points <- sapply(all_data, function(line){
  x <- unlist(regmatches(line, gregexpr("[+-]?\\d+(?:\\.\\d+)?", line)))
  return(as.numeric(gsub(',', '', x)))
}, USE.NAMES = FALSE)

# Create a data frame from our parsed data for each point
points <- as.data.frame(t(points))
colnames(points) <- c("X", "Y", "Vx", "Vy")

# Function to move a point according to its velocity
movePoint <- function(point, seconds = 1){
  point["X"] <- point["X"] + seconds * point["Vx"]
  point["Y"] <- point["Y"] + seconds * point["Vy"]
  return(point)
}

# Function to move all points in a data frame
moveAllPoints <- function(points, seconds = 1){
  for(k in 1:nrow(points)){
    points[k, ] <- movePoint(points[k, ], seconds)
  }
  return(points)
}

# Recursive function to find the time where the points converge to the message
convergePoints <- function(points, step){
  Y.lim = Inf
  count = 0
  # Repeat until points pass the points of convergence
  repeat{
    points <- moveAllPoints(points, step)
    count <- count + 1
    Y.max <- subset(points, Y == apply(points, 2, max)["Y"])[1,]["Y"]
    Y.min <- subset(points, Y == apply(points, 2, min)["Y"])[1,]["Y"]
    new.lim <- Y.max - Y.min
    print(new.lim)
    if(new.lim > Y.lim)
      break
    else
      Y.lim = new.lim
  }
  
  # Go back and use a smaller step size to focus in on the points of convergence
  if(step != 1){
    count = (count - 2) * step
    points <- moveAllPoints(points, -2 * step)
    return(count + convergePoints(points, ceiling(step / 2)))
  }
  else
    return(count - 1)
}

# Find where the points and converge and move the points there
time <- convergePoints(points, 2^10)
points <- moveAllPoints(points, time)

# Get the boundaries for our axes
X.max <- as.numeric(subset(points, X == apply(points, 2, max)["X"])[1,]["X"])
X.min <- as.numeric(subset(points, X == apply(points, 2, min)["X"])[1,]["X"])
Y.max <- as.numeric(subset(points, Y == apply(points, 2, max)["Y"])[1,]["Y"])
Y.min <- as.numeric(subset(points, Y == apply(points, 2, min)["Y"])[1,]["Y"])

# Scale the boundaries of our axes so we can see the message better
X.max <- X.max * 7/5
X.min <- X.min * 3/5
Y.max <- Y.max * 7/5
Y.min <- Y.min * 3/5

# Plot all the points
ggplot(data = points, aes(x = X, y = Y)) + 
  geom_point(aes(alpha = 0.25)) + 
  theme(legend.position = "none") + 
  theme(panel.grid.major = element_blank()) + 
  theme(panel.grid.minor = element_blank()) + 
  theme(panel.background = element_rect(fill = "white")) + 
  scale_y_reverse(limits = c(Y.max, Y.min)) + 
  scale_x_continuous(limits = c(X.min, X.max))

# Save result as a .png
ggsave("../GitHub/advent-of-code-2018/src/days/10/A_result.png")

# Give the time needed to receieve the message (part B)
print(time)
  