function burndown (srcFilename,dstFilename)

  file = fopen(srcFilename);
  lines = fskipl(file, Inf);
  frewind(file);
  sprintData = cell(lines, 3);

  for i = 1:lines
    sprintData{i,1} = fscanf(file, '%d', 1);
    sprintData{i,2} = fscanf(file, '%d', 1);
    sprintData{i,3} = fscanf(file, '%s', 1);
  end

  days = [0:1.0:5];
  workTotal = 0;
  workDone = [0,0,0,0,0,0];

  day = 2;

  for task=1:length(sprintData)

    if(day-1 < cell2mat(sprintData(task,1)))
      day = cell2mat(sprintData(task,1)) + 1;
    end

    workDone(day) += cell2mat(sprintData(task,2)); 
    workTotal += cell2mat(sprintData(task,2));

  end

  workDone(1) = workTotal;

  for day=2:length(workDone)
    workTotal = workTotal - workDone(day);
    workDone(day) = workTotal;
  end

  disp(workDone);

  figure(1);
  plot(days,workDone);
  grid on;
  xlabel ("Sprint in Tagen");
  ylabel ("Sprint-Ziel in Arbeitseinheiten");
  legend ("Verbleibende ideale Arbeitseinheiten");
  print (dstFilename,"-dpng");
endfunction
