function burndown (srcFilename,dstFilename)

  % open file with sprint data, count lines and create new cell array with lines-times rows and three coulumns
  file = fopen(srcFilename);
  lines = fskipl(file, Inf);
  frewind(file);
  sprintData = cell(lines, 3);
  
  % store sprint data in the cell array
  for i = 1:lines
    sprintData{i,1} = fscanf(file, '%d', 1);
    sprintData{i,2} = fscanf(file, '%d', 1);
    sprintData{i,3} = fscanf(file, '%s', 1);
  end

  % initialize arrays to plot the chart
  days = [0:1.0:5];
  workDone = [0,0,0,0,0,0];
  
  %initialize variables
  day = 2;
  workTotal = 0;

  %sum up the work that was done during the sprint
  for task=1:length(sprintData)

    if(day-1 < cell2mat(sprintData(task,1)))
      day = cell2mat(sprintData(task,1)) + 1;
    end

    workDone(day) += cell2mat(sprintData(task,2)); 
    workTotal += cell2mat(sprintData(task,2));

  end

  %the work at the begining of sprint is the totalWork for the sprint
  workDone(1) = workTotal;

  for day=2:length(workDone)
    workTotal = workTotal - workDone(day);
    workDone(day) = workTotal;
  end

  disp(workDone);

  %plot the burndown chart
  figure(1);
  plot(days,workDone);
  grid on;
  xlabel ("Sprint in Tagen");
  ylabel ("Sprint-Ziel in Arbeitseinheiten");
  legend ("Verbleibende ideale Arbeitseinheiten");
  print (dstFilename,"-dpng");
endfunction
