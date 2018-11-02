# 1. loading data: three columns, X time, Y size, Z rod
# 2. the distribution of X values 	


#load the txt. the HEADER is false by default using the read_table 
fish <- read.table("fish1.txt")
summary(fish)
str(fish)

#draw the scatter plot 
attach(fish)
plot(V1,V2,main = "scatterplot",xlab = "time",ylab = "size",col = c("red","green","blue")[fish$V3]) #plot with different color 
#want to make different x y axis